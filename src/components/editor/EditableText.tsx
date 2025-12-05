import React, { useState, useRef, useEffect, useCallback, KeyboardEvent, ChangeEvent } from 'react';
import { usePageEditorOptional } from '../../contexts/PageEditorContext';
import { Edit2 } from 'lucide-react';

interface EditableTextProps {
    contentKey: string;
    defaultValue: string;
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
    className?: string;
    multiline?: boolean;
}

/**
 * EditableText v2 - Fixed version with proper text input (no backwards typing)
 * Uses controlled textarea/input instead of contentEditable
 */
const EditableText: React.FC<EditableTextProps> = ({
    contentKey,
    defaultValue,
    as: Component = 'span',
    className = '',
    multiline = false,
}) => {
    const pageEditor = usePageEditorOptional();
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState('');
    const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

    // Undo/Redo stacks
    const [undoStack, setUndoStack] = useState<string[]>([]);
    const [redoStack, setRedoStack] = useState<string[]>([]);

    // Get the current value (edited > DB > default)
    const currentValue = pageEditor?.getContentValue(contentKey, defaultValue) ?? defaultValue;

    // Check if we're in edit mode
    const isEditMode = pageEditor?.isEditMode ?? false;

    // Initialize local value when current value changes
    useEffect(() => {
        setLocalValue(currentValue);
    }, [currentValue]);

    // Focus input when editing starts
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            // Move cursor to end
            const len = inputRef.current.value.length;
            inputRef.current.setSelectionRange(len, len);
        }
    }, [isEditing]);

    // Handle starting to edit
    const handleStartEdit = () => {
        if (!isEditMode) return;
        setIsEditing(true);
        // Save current state to undo stack
        setUndoStack(prev => [...prev, localValue]);
        setRedoStack([]);
    };

    // Handle input changes
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        pageEditor?.updateContent(contentKey, newValue, defaultValue);
    };

    // Handle blur (finish editing)
    const handleBlur = () => {
        setIsEditing(false);
    };

    // Undo function
    const undo = useCallback(() => {
        if (undoStack.length > 0) {
            const previousValue = undoStack[undoStack.length - 1];
            setRedoStack(prev => [...prev, localValue]);
            setUndoStack(prev => prev.slice(0, -1));
            setLocalValue(previousValue);
            pageEditor?.updateContent(contentKey, previousValue, defaultValue);
        }
    }, [undoStack, localValue, pageEditor, contentKey, defaultValue]);

    // Redo function
    const redo = useCallback(() => {
        if (redoStack.length > 0) {
            const nextValue = redoStack[redoStack.length - 1];
            setUndoStack(prev => [...prev, localValue]);
            setRedoStack(prev => prev.slice(0, -1));
            setLocalValue(nextValue);
            pageEditor?.updateContent(contentKey, nextValue, defaultValue);
        }
    }, [redoStack, localValue, pageEditor, contentKey, defaultValue]);

    // Handle keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
        // Escape - cancel editing
        if (e.key === 'Escape') {
            setLocalValue(currentValue);
            setIsEditing(false);
            return;
        }

        // Enter - finish editing (for single line)
        if (e.key === 'Enter' && !multiline) {
            e.preventDefault();
            inputRef.current?.blur();
            return;
        }

        // Ctrl+Z / Cmd+Z - Undo
        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            undo();
            return;
        }

        // Ctrl+Shift+Z / Cmd+Shift+Z - Redo
        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
            e.preventDefault();
            redo();
            return;
        }

        // Ctrl+Y / Cmd+Y - Redo (alternative)
        if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
            e.preventDefault();
            redo();
            return;
        }
    };

    // If not in edit mode, render normally
    if (!isEditMode) {
        return React.createElement(Component, { className }, localValue);
    }

    // In edit mode but not actively editing - show clickable element
    if (!isEditing) {
        return (
            <div className="relative group inline-block">
                {React.createElement(
                    Component,
                    {
                        className: `${className} cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-bakery-400 hover:outline-offset-2 hover:bg-bakery-50/30 rounded transition-all`,
                        onClick: handleStartEdit,
                    },
                    localValue
                )}
                {/* Edit indicator icon */}
                <span
                    className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-bakery-500 text-white p-1 rounded-full shadow-md cursor-pointer z-10"
                    onClick={handleStartEdit}
                >
                    <Edit2 size={12} />
                </span>
            </div>
        );
    }

    // Actively editing - show input/textarea
    const inputClassName = `${className} w-full bg-white border-2 border-bakery-500 rounded-lg p-2 outline-none shadow-lg resize-none`;

    return (
        <div className="relative">
            {multiline ? (
                <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    value={localValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className={inputClassName}
                    rows={3}
                    style={{ minHeight: '60px' }}
                />
            ) : (
                <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="text"
                    value={localValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className={inputClassName}
                />
            )}
            <div className="absolute -bottom-6 left-0 text-xs text-stone-500 flex gap-3">
                <span>Esc = anulează</span>
                <span>Ctrl+Z = undo</span>
                <span>Ctrl+Shift+Z = redo</span>
            </div>
        </div>
    );
};

export default EditableText;
