import { AnimationProps } from "framer-motion";
import { motion } from "framer-motion";
import React, { useCallback } from "react";

import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

interface InputProps<T> extends UseControllerProps<T> {
  className: string;
  placeholder: string;
  animationProps?: AnimationProps | null;
}

export default function Input<T extends FieldValues>({
  className = "",
  placeholder,
  animationProps = null,
  ...props
}: InputProps<T>) {
  const { field, fieldState } = useController(props);
  const { name, onBlur, onChange, ref, value } = field;

  /**
   * Allows us to set the correct width for the inputs when they are first rendered.
   */
  const callbackRef = useCallback((node: HTMLInputElement | null) => {
    if (!node) {
      return;
    }
    if (!node.value.length) {
      node.style.minWidth = node.placeholder.length / 1.2 + "ch";
    } else {
      node.style.minWidth = node.value.length / 1.2 + "ch";
    }
  }, []);

  return (
    <motion.div
      className="flex flex-row flex-grow justify-between overflow-hidden"
      ref={ref}
      {...animationProps}
    >
      <input
        ref={(node) => {
          ref(node);
          callbackRef(node);
        }}
        onInput={(event) => {
          if (!event.currentTarget.value.length) {
            event.currentTarget.style.minWidth =
              event.currentTarget.placeholder.length / 1.2 + "ch";
          } else {
            event.currentTarget.style.minWidth =
              event.currentTarget.value.length / 1.2 + "ch";
          }
        }}
        className={className}
        placeholder={placeholder}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      />
      {fieldState.error && (
        <p className="whitespace-nowrap overflow-hidden text-ellipsis min-w-0 text-sm text-red-500 text-opacity-70">
          {fieldState.error.message}
        </p>
      )}
    </motion.div>
  );
}
