import React from 'react';
import { useStore } from '../store/useStore';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { GripVertical, Eye, EyeOff } from 'lucide-react';

export default function SectionManager() {
  const { sections, setSections, updateSection } = useStore();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSections(items);
  };

  return (
    <div className="bg-gray-900 border-l border-gray-800 w-64 flex flex-col h-full text-gray-300">
      <div className="p-4 border-b border-gray-800 bg-gray-800/50">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Sections</h2>
        <p className="text-xs text-gray-500 mt-1">Drag to reorder, click to toggle</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {sections.map((section, index) => (
                  <Draggable key={section.id} draggableId={section.id} index={index}>
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                          snapshot.isDragging 
                            ? 'bg-gray-800 border-indigo-500 shadow-xl shadow-indigo-500/10' 
                            : 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div {...provided.dragHandleProps} className="text-gray-500 hover:text-gray-300 cursor-grab active:cursor-grabbing">
                            <GripVertical className="w-4 h-4" />
                          </div>
                          <span className={`text-sm font-medium ${!section.visible && 'opacity-50 line-through'}`}>
                            {section.title}
                          </span>
                        </div>
                        <button
                          onClick={() => updateSection(section.id, { visible: !section.visible })}
                          className="text-gray-500 hover:text-indigo-400 transition-colors"
                        >
                          {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
