import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from 'react-dom';
import { Box } from '@mantine/core';

interface ModalPortalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export function ModalPortal({ isOpen, onClose, children }: ModalPortalProps) {
    const modalRoot = useRef<HTMLElement | null>(null);

    useEffect(() => {
        modalRoot.current = document.getElementById('modal-root');
        if (!modalRoot.current) {
            const div = document.createElement('div');
            div.id = 'modal-root';
            document.body.appendChild(div);
            modalRoot.current = div;
        }
    }, []);
    if (!isOpen) return null;

    return createPortal(
        <Box style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        }}
        onClick={onClose}
        >
        
            <Box style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                maxWidth: '800px',
                width: '90%',
                maxHeight: '90vh',
                overflow: 'auto',
                padding: '20px',
                position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
            >
            {children}
            </Box>
        </Box>,
        modalRoot.current!
    );

}