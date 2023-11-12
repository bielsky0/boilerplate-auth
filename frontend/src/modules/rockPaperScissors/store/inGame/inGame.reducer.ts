import { useReducer } from "react";
import { InGameAction, InGameActions, InGameState } from "./inGame.types";

export const initialState: InGameState = {
    prePick: null,
};

export const useInGameReducer = (initialArg?: InGameState) => {
    const [state, dispatch] = useReducer(inGameReducer, initialArg || initialState);

    return { state, dispatch }
}

export const inGameReducer = (state: InGameState, { type, payload }: InGameActions): InGameState => {
    switch (type) {
        case InGameAction.MAKE_PRE_PICK:
            return { ...state, prePick: payload.prePick }
        default:
            throw Error(`Cannot resolve reducer action type ${type}`)
    }
}