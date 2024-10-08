import { StateCreator } from "zustand";
import { RiskStudentStore } from "./RiskStudents/types";

export type SliceStore<T> = StateCreator<StoreType, [], [], T>;
export type StoreType = RiskStudentStore