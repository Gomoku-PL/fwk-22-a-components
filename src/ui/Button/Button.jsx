import React from 'react';

export default function Button({ children,
    variant = 'primary',
    onClick,
    type = 'button',
    ariaLabel
}){
    const isDisabled = variant === 'disabled';
    const className= [StyleSheet.btn, styles[variant]].join(' ');
    const computerAriaLabel = ariaLabel || (typeof children === 'string' ? children : undefined);
    return <button 
    className={className} onClick={isDisabled ? undefined : onClick} type={type} aria-label={computerAriaLabel} disabled={isDisabled}>{children}</button>;
}