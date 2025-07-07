import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Star, Zap } from 'lucide-react';

export interface InventoryItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  rarity: 'common' | 'rare' | 'legendary';
  effects?: string[];
}

interface InventorySystemProps {
  items: InventoryItem[];
  onItemUse?: (itemId: string) => void;
  onItemCombine?: (item1Id: string, item2Id: string) => void;
  maxSlots?: number;
}

export const InventorySystem: React.FC<InventorySystemProps> = ({
  items,
  onItemUse,
  onItemCombine,
  maxSlots = 8
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showInventory, setShowInventory] = useState(false);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'legendary': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const handleItemClick = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    } else if (selectedItems.length < 2) {
      setSelectedItems(prev => [...prev, itemId]);
    }
  };

  const handleUseItem = (itemId: string) => {
    onItemUse?.(itemId);
    setSelectedItems([]);
  };

  const handleCombineItems = () => {
    if (selectedItems.length === 2) {
      onItemCombine?.(selectedItems[0], selectedItems[1]);
      setSelectedItems([]);
    }
  };

  return (
    <>
      <motion.button
        className="fixed top-20 right-4 z-40 bg-primary text-primary-foreground p-3 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowInventory(!showInventory)}
      >
        <Package className="w-5 h-5" />
        {items.length > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[20px] h-5 flex items-center justify-center text-xs">
            {items.length}
          </Badge>
        )}
      </motion.button>

      <AnimatePresence>
        {showInventory && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-16 right-4 w-80 z-50"
          >
            <Card className="bg-card/95 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5" />
                  <h3 className="font-bold">کیف اقلام</h3>
                  <Badge variant="secondary">{items.length}/{maxSlots}</Badge>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-4">
                  {Array(maxSlots).fill(null).map((_, index) => {
                    const item = items[index];
                    return (
                      <motion.div
                        key={index}
                        className={`aspect-square border-2 rounded-lg p-2 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                          item ? 'border-primary bg-primary/10' : 'border-dashed border-muted'
                        } ${selectedItems.includes(item?.id || '') ? 'ring-2 ring-yellow-400' : ''}`}
                        whileHover={item ? { scale: 1.05 } : {}}
                        onClick={() => item && handleItemClick(item.id)}
                      >
                        {item ? (
                          <>
                            <div className="text-2xl mb-1">{item.emoji}</div>
                            <div className={`w-full h-1 rounded ${getRarityColor(item.rarity)}`} />
                          </>
                        ) : (
                          <div className="text-muted-foreground text-xs">خالی</div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {selectedItems.length > 0 && (
                  <div className="space-y-2">
                    {selectedItems.map(itemId => {
                      const item = items.find(i => i.id === itemId);
                      return item ? (
                        <div key={itemId} className="bg-secondary/50 p-2 rounded text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{item.emoji}</span>
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      ) : null;
                    })}
                    
                    <div className="flex gap-2">
                      {selectedItems.length === 1 && (
                        <Button 
                          size="sm" 
                          onClick={() => handleUseItem(selectedItems[0])}
                          className="flex-1"
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          استفاده
                        </Button>
                      )}
                      {selectedItems.length === 2 && (
                        <Button 
                          size="sm" 
                          onClick={handleCombineItems}
                          className="flex-1"
                        >
                          <Star className="w-3 h-3 mr-1" />
                          ترکیب
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};