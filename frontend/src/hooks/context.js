import React, { useState, createContext, useContext, useEffect} from 'react'
  
import { loggedFn } from '../services/auth'
import { getArtistFn, getAllArtistFn } from '../services/artist'
import { getWorksFn, getMyCartFn } from '../services/works'
import { getMyStreamingsFn } from '../services/streaming'
import { getMyCoursesFn } from '../services/courses'
  
  export const AppContext = createContext()
  
  export const AppCtxProvider = props => {
    const [user, setUser] = useState(null)
    const [artist, setArtist] = useState(null)
    const [allArtists, setAllArtists] = useState(null)
    const [works, setWorks] = useState(null)
    const [cart, setCart] = useState(null)
    const [myStreamings, setMyStreamings] = useState(null)
    const [userCourses, setUserCourses] = useState(null)
  
    useEffect(() => {
      async function getSessionData() {
        const { data } = await loggedFn()
        login(data);
      }
  
      getSessionData()
    }, [])

    useEffect(() => {
      async function getArtist() {
        if (user) {
          const { data } = await getArtistFn()
          setUserArtistFn(data);
        }
      }
  
      getArtist()
    }, [user])

    useEffect(() => {
      async function getAllArtists() {
          const {data} = await getAllArtistFn()
          setAllArtists(data)}
  
      getAllArtists()
    }, [])

    useEffect(() => {
      async function getWorks() {
        if (user) {
          const { data } = await getWorksFn()
          if (data.length !== 0) setUserWorksFn(data);
      }
    }
  
      getWorks()
    }, [user])

    useEffect(() => {
      async function getCart() {
        if (user && !cart) {
          const { data } = await getMyCartFn()
          setCartFn([...data]);
        }
      }
      getCart()
    }, [cart, user])
    
    useEffect(() => {
      async function getMyStreamings() {
        if (user) {
          const { data } = await getMyStreamingsFn()
          if (data.length !== 0) setMyStreamingsFn(data);
        }
      }
  
      getMyStreamings()
    }, [user])
    
    useEffect(() => {
      function getMyCourses() {
        if (user) setUserCoursesFn()
      }
      getMyCourses()
    }, [user])

    const setUserArtistFn = artistInfo => {
      setArtist(artistInfo)
    }

    const setUserWorksFn = async () => {
      const { data } = await getWorksFn()
      if(!data) return setWorks(null)
      setWorks(data)
    }

    const setCartFn = (cartArr) => {
      setCart(cartArr)
    }

    const setMyStreamingsFn = async () => {
      const { data } = await getMyStreamingsFn()
      if(!data) return setMyStreamings(null)
      setMyStreamings(data)
    }

    const setUserCoursesFn = async () => {
      const { data } = await getMyCoursesFn()
      setUserCourses(data);
    }
  
    const login = userInfo => {
      setUser(userInfo)
    }
  
    const logout = () => {
      setUser(null)
    }
  
    const value = { user, login, logout, artist, 
      setUserArtistFn, allArtists,
      setCartFn, cart,
      works, setUserWorksFn, myStreamings, 
      setMyStreamingsFn, userCourses,
      setUserCoursesFn }
  
    return (
      <AppContext.Provider {...props} value={value} />
    )
  }
    
  export const useContextInfo = () => useContext(AppContext)