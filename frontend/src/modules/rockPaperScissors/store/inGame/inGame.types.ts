import { Pick } from "..";

export enum InGameAction {
    MAKE_PRE_PICK = "makePrePick"
}

export type MakePrePickPayload = {
    prePick: Pick | null;
}

export type InGameActionMapper<T extends InGameAction> =
    T extends InGameAction.MAKE_PRE_PICK ? MakePrePickPayload :
    never;

export type AllTogetherImpl<T extends InGameAction = InGameAction> = {
    type: T;
    payload: InGameActionMapper<T>;
}

export type InGameActions = InGameAction extends infer U
    ? U extends InGameAction
    ? AllTogetherImpl<U>
    : never
    : never;


export type InGameState = {
    prePick: Pick | null
}