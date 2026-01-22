import "./modal.css"
import ReactModal from "react-modal"

export const Modal = ({
    isOpen,
    onClose,
    children,
    title = '',
    className = '',
    closeOnOverlayClick = true,
    shouldCloseOnEsc = true
}) => {

    return (
        <ReactModal
            isOpen={isOpen}
            contentLabel={title}
            onRequestClose={onClose}
            shouldCloseOnOverlayClick={closeOnOverlayClick}
            shouldCloseOnEsc={shouldCloseOnEsc}
            ariaHideApp={false}
            className={`modal-content ${className}`}
            overlayClassName="modal-overlay"
        >
            <div className="modal-body">
                {children}
            </div>
        </ReactModal>
    )
}