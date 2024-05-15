import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  //   PointerSensor,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface IProps {
  children?: ReactNode;
  items: Array<{ id: string; [key: string]: any }>;
  onDragEnd: (oldIndex: number, newIndex: number) => void;
}
const SortableContainer: FC<IProps> = (props: IProps) => {
  const { children, items, onDragEnd } = props;

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, //8px
      },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over == null) return;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((c) => c.fe_id === active.id);
      const newIndex = items.findIndex((c) => c.fe_id === over.id);
      onDragEnd(oldIndex, newIndex);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};
export default memo(SortableContainer);
