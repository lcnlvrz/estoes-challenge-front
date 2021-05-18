export interface IConfirModalProps {
  explain: string;
  okText: string;
  cancelText: string;
  modalTitle: string;
  visible: boolean;
  question: string;
  projectId: number;
  onOk: (id: number) => void;
  onCancel: () => void;
}
