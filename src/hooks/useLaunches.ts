import { useReducer, useEffect } from "react";
import { fetchLaunches } from "../api/spacex";
import { launchesReducer, initialState } from "../reducers/launchesReducer";
import type { Launch } from "../types/spacex";

export function useLaunches() {
    const [state, dispatch] = useReducer(launchesReducer, initialState);

    useEffect(() => {
        let cancelled = false;
        const loadLaunches = async () => {
            dispatch({ type: 'FETCH_INIT' });
            try {
                const data = await fetchLaunches();
                if (!cancelled) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: data });
                }
            } catch (err) {
                if (!cancelled) {
                    dispatch({ type: 'FETCH_FAILURE', payload: (err as Error).message });
                }
            }
        };
        loadLaunches();
        return () => { cancelled = true; };
    }, []);

    const selectLaunch = (launch: Launch) => {
        dispatch({ type: 'SELECT_LAUNCH', payload: launch });
    };

    const closeModal = () => {
        dispatch({ type: 'CLOSE_MODAL' });
    };

    return { state, selectLaunch, closeModal };
}