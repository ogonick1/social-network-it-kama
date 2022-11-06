// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// export const apiSliceWS = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000'}),
//   endpoints: (build) => ({
//     getMessages: build.query({
//       query: () => 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',
//       async onCacheEntryAdded(
//         arg,
//         { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
//       ) {
//         // create a websocket connection when the cache subscription starts
//         const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
//         try {
//           // wait for the initial query to resolve before proceeding
//           await cacheDataLoaded

//           // when data is received from the socket connection to the server,
//           // if it is a message and for the appropriate channel,
//           // update our query result with the received message
//           const listener = (event) => {
//             const data = JSON.parse(event.data)
//             if ( data || data.channel !== arg) return

//             updateCachedData((draft) => {
//               draft.push(data)
//             })
//           }

//           ws.addEventListener('message', listener)
//         } catch {
//           // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
//           // in which case `cacheDataLoaded` will throw
//         }
//         // cacheEntryRemoved will resolve when the cache subscription is no longer active
//         await cacheEntryRemoved
//         // perform cleanup steps once the `cacheEntryRemoved` promise resolves
//         ws.close()
//       },
//     }),
//   }),
// })

// export const { useGetMessagesQuery } = apiSliceWS