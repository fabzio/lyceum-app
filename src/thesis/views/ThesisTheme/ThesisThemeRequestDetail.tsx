"use client"

import { thesisThemeRequestList } from './data'
import { Mail } from './components/mail'


export default function ThesisManagement(){
  const defaultLayout = [35, 40, 25]
  return (
    <div className="hidden flex-col md:flex h-full">
      <Mail mails={thesisThemeRequestList} defaultLayout={defaultLayout} />
    </div>
  )
}