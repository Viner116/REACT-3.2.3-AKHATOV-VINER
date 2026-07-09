import type { Launch } from '../types/spacex';

export type State = {
    launches: Launch[];
    loading: boolean;
    error: string | null;
    selectedLaunch: Launch | null;
};

export type Action =
    | { type: 'FETCH_INIT' }
    | { type: 'FETCH_SUCCESS'; payload: Launch[] }
    | { type: 'FETCH_FAILURE'; payload: string }
    | { type: 'SELECT_LAUNCH'; payload: Launch }
    | { type: 'CLOSE_MODAL' };

export const initialState: State = {
    launches: [], // ✅ всегда массив
    loading: false,
    error: null,
    selectedLaunch: null,
};

export function launchesReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'FETCH_INIT':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                launches: action.payload || [],
                error: null,
            };
        case 'FETCH_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'SELECT_LAUNCH':
            return { ...state, selectedLaunch: action.payload };
        case 'CLOSE_MODAL':
            return { ...state, selectedLaunch: null };
        default:
            return state;
    }
}