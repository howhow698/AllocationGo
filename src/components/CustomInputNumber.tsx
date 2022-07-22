import React, { useRef } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import {
  ArrowKey,
  LegalKeys,
  NumberKey,
  OperateKey,
} from '../constants/KeyboardEvent';
import { isNumeric } from '../utils/NumberValidator';

type CustomInputNumberChangeEvent = {
  name: string;
  value: number;
};
type CustomInputNumberBlurEvent = CustomInputNumberChangeEvent;
type CustomInputNumberProps = {
  disabled: boolean;
  max: number;
  min: number;
  minusDisabled: boolean;
  name: string;
  plusDisabled: boolean;
  step: number;
  tabIndex: number;
  value: number;
  onChange: (event: CustomInputNumberChangeEvent) => void;
  onBlur?: (event: CustomInputNumberBlurEvent) => void;
};

function CustomInputNumber({
  disabled = false,
  max = 999,
  min = 0,
  minusDisabled = false,
  name = '',
  plusDisabled = false,
  step = 1,
  tabIndex = 0,
  value = 0,
  onChange,
  onBlur,
}: CustomInputNumberProps) {
  const inputNumberRef = useRef<HTMLDivElement>(null);
  const isMinusDisabled = disabled || minusDisabled || value == min;
  const isPlusDisabled = disabled || plusDisabled || value == max;

  function focusInputNumber() {
    if (inputNumberRef.current != null && !disabled) {
      inputNumberRef.current.focus();
    }
  }

  function handInputNumberBlur() {
    if (typeof onBlur === 'function' && !disabled) {
      onBlur({ name, value });
    }
  }

  function handleInputNumberChange(num: number) {
    if (isNumeric(num) && num <= max && num >= min) {
      onChange({
        name,
        value: num,
      });
    }
  }

  function handleInputNumberKeyDown(event: React.KeyboardEvent) {
    const { key } = event;
    if (!Object.values(LegalKeys).some((v) => v === key) || disabled) {
      return;
    }

    if (key === ArrowKey.ArrowDown) {
      handleStepperMinus();
    }

    if (key === ArrowKey.ArrowUp) {
      handleStepperPlus();
    }

    if (key === OperateKey.Backspace) {
      handleInputNumberChange(+`${value}`.slice(0, -1));
    }

    if (Object.values(NumberKey).some((v) => v === key)) {
      handleInputNumberChange(+(`${value}` + `${key}`));
    }
  }

  function handleStepperMinus() {
    focusInputNumber();
    const newInputNum = value - step;
    handleInputNumberChange(newInputNum);
  }

  function handleStepperPlus() {
    focusInputNumber();
    const newInputNum = value + step;
    handleInputNumberChange(newInputNum);
  }

  return (
    <div className="flex gap-2">
      <button
        className={`${
          isMinusDisabled
            ? 'text-disabled border-disabled'
            : 'text-primary border-primary'
        } h-12 w-12 text-base border flex justify-center items-center`}
        disabled={isMinusDisabled}
        onClick={handleStepperMinus}
      >
        <MinusIcon />
      </button>
      <div
        ref={inputNumberRef}
        tabIndex={tabIndex}
        className="text-disabled border-disabled focus:border-black focus:border-2 focus:rounded h-12 w-12  text-base border flex justify-center items-center"
        onBlur={handInputNumberBlur}
        onKeyDown={handleInputNumberKeyDown}
      >
        {value}
      </div>
      <button
        className={`${
          isPlusDisabled
            ? 'text-disabled border-disabled'
            : 'text-primary border-primary'
        } h-12 w-12 text-base border flex justify-center items-center`}
        disabled={isPlusDisabled}
        onClick={handleStepperPlus}
      >
        <PlusIcon />
      </button>
    </div>
  );
}

export default CustomInputNumber;
