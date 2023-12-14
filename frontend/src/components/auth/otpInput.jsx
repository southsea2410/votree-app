import * as React from 'react';
import { colors } from '../../styles';
import './../../index.css';
import { RE_DIGIT } from '../../constants';
import { useMemo } from 'react';

const otpContainer = {
    display: 'flex',
    flexDirection: 'row',
    columnGap: '15px',
    margin: 0
}

const otpInput = {
    width: '45px',
    height: '45px',
    border: `0.5px solid`,
    borderRadius: '5px',
    textAlign: 'center',
    background: colors.secondary,
    color: colors.green6,
}

const otpInputContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
}

export default function OtpInput({ value, valueLength, onChange }) {
    const valueItems = useMemo(() => {
        const valueArray = value.split('');
        const items = [];
      
        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i];
        
            if (RE_DIGIT.test(char)) {
                items.push(char);
            } else {
                items.push('');
            }
        }
      
        return items;
    }, [value, valueLength]);

    const focusToNextInput = (target) => {
        const nextElementSibling = target.nextElementSibling;
    
        if (nextElementSibling) {
            nextElementSibling.focus();
        }
      };
      const focusToPrevInput = (target) => {
        const previousElementSibling =
            target.previousElementSibling;
    
        if (previousElementSibling) {
            previousElementSibling.focus();
        }
    };

    const inputOnChange = (event, index) => {
        const target = event.target;
        let targetValue = target.value.trim();
        const isTargetValueDigit = RE_DIGIT.test(targetValue);

        if (!isTargetValueDigit && targetValue !== '') {
            return;
        }

        const nextInputEl = target.nextElementSibling;

        if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
            return;
        }

        targetValue = isTargetValueDigit ? targetValue : ' ';

        const targetValueLength = targetValue.length;

        if (targetValueLength === 1) {
            const newValue = value.substring(0, index) + targetValue + value.substring(index + 1);

            onChange(newValue);

            if (!isTargetValueDigit) {
                return
            }

            focusToNextInput(target);

            const nextElementSibling = target.nextElementSibling;

            if (nextElementSibling) {
                nextElementSibling.focus();
            }
        } else if (targetValueLength === valueLength) {
            onChange(targetValue);

            target.blur();
        }
    };

    const inputOnKeyDown = (event) => {
        const { key } = event;
        const target = event.target;

        if (key === 'ArrowRight' || key === 'ArrowDown') {
            event.preventDefault();
            return focusToNextInput(target);
        }

        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            event.preventDefault();
            return focusToPrevInput(target);
        }

        const targetValue = target.value;

        target.setSelectionRange(0, targetValue.length);

        if (event.key !== 'Backspace' || target.value !== '') {
            return;
        }

        focusToPrevInput(target);

        const previousElementSibling = target.previousElementSibling;

        if (previousElementSibling) {
            previousElementSibling.focus();
        }
    };

    const inputOnFocus = (event) => {
        const { target } = event;

        const prevInputEl = target.previousElementSibling;

        if (prevInputEl && prevInputEl.value === '') {
            return prevInputEl.focus();
        }

        target.setSelectionRange(0, target.value.length);
    };

    return (
        <div style={otpContainer}>
            {valueItems.map((digit, index) => (
                <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    pattern="\d{1}"
                    maxLength={valueLength}
                    style={otpInput}
                    className='subtitle-bold-28'
                    value={digit}
                    onChange={(e) => inputOnChange(e, index)}
                    onKeyDown={inputOnKeyDown}
                    onFocus={inputOnFocus}
                />
            ))}
        </div>
    );
}