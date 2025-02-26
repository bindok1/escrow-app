import { ViewState } from "../enum/enumBuyerTransaction";


interface ViewStateProps {
  isConnected: boolean;
  isLoading: boolean;
  dataLength: number;
}

export const useViewState = ({ isConnected, isLoading, dataLength }: ViewStateProps): ViewState => {
  if (!isConnected) return ViewState.WALLET_DISCONNECTED;
  if (isLoading) return ViewState.LOADING;
  if (dataLength === 0) return ViewState.EMPTY;
  return ViewState.DATA;
};