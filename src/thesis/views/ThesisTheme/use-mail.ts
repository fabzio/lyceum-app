import { atom, useAtom } from "jotai"

import { ThesisThemeRequest } from "@/interfaces/Thesis/ThesisThemeRequest"

type Config = {
  selected: ThesisThemeRequest["id"] | null
}

const configAtom = atom<Config>({
  selected: null,
})

export function useMail() {
  return useAtom(configAtom)
}
