import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';

export const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "Select Option",
  label,
  icon: Icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const selectedOption = options.find(opt => (opt.value || opt) === value);
  const selectedLabel = selectedOption ? (selectedOption.label || selectedOption) : placeholder;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">{label}</label>}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-zinc-900/80 border border-white/15 text-white hover:border-purple-500/50 transition-all text-sm font-medium focus:outline-none focus:border-purple-500 shadow-md backdrop-blur-md"
      >
        <div className="flex items-center gap-2.5 truncate">
          {Icon && <Icon className="w-4 h-4 text-purple-400 shrink-0" />}
          <span className={!value ? "text-zinc-400" : "text-white"}>{selectedLabel}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-purple-400' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 z-30 mt-1 max-h-60 overflow-y-auto rounded-2xl bg-zinc-900/95 border border-white/15 shadow-2xl backdrop-blur-2xl py-2 divide-y divide-white/5"
          >
            {options.map((option, idx) => {
              const optVal = option.value !== undefined ? option.value : option;
              const optLbl = option.label !== undefined ? option.label : option;
              const isSelected = optVal === value;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onChange(optVal);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-xs text-left transition-colors ${
                    isSelected ? 'bg-purple-600/20 text-purple-300 font-semibold' : 'text-zinc-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{optLbl}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-purple-400" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
