import React, { useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import { DragDropItem } from '@/types/story-game';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface DragDropAreaProps {
  prompt: string;
  items: DragDropItem[];
  onSuccess: (selectedItems: DragDropItem[]) => void;
}

interface DraggableItemProps {
  item: DragDropItem;
  isDragging: boolean;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, isDragging }) => {
  const [{ }, drag] = useDrag(() => ({
    type: 'item',
    item: { item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`p-4 bg-white/20 rounded-lg cursor-move text-center border-2 border-white/30 hover:border-white/50 transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="text-3xl mb-2">{item.icon}</div>
      <div className="text-sm text-white">{item.name}</div>
    </motion.div>
  );
};

export const DragDropArea: React.FC<DragDropAreaProps> = ({ prompt, items, onSuccess }) => {
  const [selectedItems, setSelectedItems] = useState<DragDropItem[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'item',
    drop: (droppedItem: { item: DragDropItem }) => {
      if (selectedItems.length < 3 && !selectedItems.find(item => item.id === droppedItem.item.id)) {
        const newItems = [...selectedItems, droppedItem.item];
        setSelectedItems(newItems);
        
        if (newItems.length === 3) {
          setIsComplete(true);
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const removeItem = (itemId: string) => {
    const newItems = selectedItems.filter(item => item.id !== itemId);
    setSelectedItems(newItems);
    setIsComplete(false);
  };

  const handleSubmit = () => {
    if (selectedItems.length === 3) {
      onSuccess(selectedItems);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-lg text-yellow-300 text-center">{prompt}</p>
      
      {/* Available items */}
      <div className="grid grid-cols-4 gap-4">
        {items.map((item) => (
          <DraggableItem
            key={item.id}
            item={item}
            isDragging={selectedItems.find(selected => selected.id === item.id) !== undefined}
          />
        ))}
      </div>

      {/* Drop zone */}
      <motion.div
        ref={drop}
        className={`min-h-32 border-2 border-dashed rounded-lg p-4 transition-all ${
          isOver 
            ? 'border-green-400 bg-green-400/20' 
            : 'border-white/50 bg-white/10'
        }`}
        whileHover={{ scale: 1.02 }}
      >
        <p className="text-center text-white/70 mb-4">
          ابزارهای انتخابی خود را اینجا بکشید ({selectedItems.length}/3)
        </p>
        
        <div className="flex justify-center gap-4 flex-wrap">
          {selectedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="relative bg-gradient-to-br from-green-500 to-blue-500 p-3 rounded-lg cursor-pointer"
              onClick={() => removeItem(item.id)}
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xs text-white">{item.name}</div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs cursor-pointer">
                ×
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Submit button */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            تایید انتخاب
          </Button>
        </motion.div>
      )}
    </div>
  );
};