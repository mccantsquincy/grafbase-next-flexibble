import { CustomButtonProps } from '@/common.types'
import React from 'react'

const CustomButton = ({ title, containerStyles } : CustomButtonProps) => {
  return (
    <button className={`px-6 py-4 rounded-sm  ${containerStyles}`}>
      {title}
    </button>
  )
}

export default CustomButton