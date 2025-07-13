import React, { useEffect, useState } from "react"

export const useFetch = (callback: (o: unknown) => void, options: unknown) => {
  useEffect(() => {
    if (options) callback(options)
  }, [options])
}

export const useObserver = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      {
        root: null,
        rootMargin: "10px",
        threshold: 1,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref.current])

  return { isVisible, setIsVisible }
}
