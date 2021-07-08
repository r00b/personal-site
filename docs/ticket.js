// import React, { useEffect, useState } from "react";
// import "../styles/components/aircraft.scss";
// import _ from "lodash";
// import loadable from "@loadable/component";
//
// // react-text-transition cannot do SSR
// const TextTransition = loadable(() => import("react-text-transition"));
//
// const TICKET_URL = `http://localhost:8008/auth/ticket`;
// const headers = new Headers();
// headers.set(
//   "Authorization",
//   `Basic ${btoa(
//     `${process.env.GATSBY_SERVE1090_USERNAME}:${process.env.GATSBY_SERVE1090_PASSWORD}`
//   )}`
// );
//
// const WS_URL = `ws://localhost:8008/airports/kdca`;
// const SOCKET_RETRY_TIME = 5000;
//
// const Aircraft = () => {
//   /**
//    * Format the text that goes into aircraft DOM, adding extra
//    * data if it is available
//    */
//   function formatText(ac, inbound) {
//     let text = `${ac.flight}`;
//     if (ac.type) {
//       text += `, ${ac.type}`;
//     }
//     if (inbound && ac.origin) {
//       text += ` from ${ac.origin}`;
//     } else if (!inbound && ac.destination) {
//       text += ` to ${ac.destination}`;
//     }
//     return text;
//   }
//
//   /**
//    * DOM-ify an individual aircraft object
//    */
//   function aircraftDom(ac, inbound) {
//     return (
//       <a
//         key={ac.hex}
//         target="_blank"
//         rel="noreferrer"
//         href={"https://flightaware.com/live/flight/" + ac.flight}>
//         {formatText(ac, inbound)}
//       </a>
//     );
//   }
//
//   /**
//    * Build the DOM that defines tracking data
//    */
//   function domify(aircraft, inbound) {
//     if (_.get(aircraft, "length")) {
//       const dom = [aircraftDom(aircraft[0], inbound)];
//       if (aircraft[1]) {
//         dom.push(
//           <span className="hidden lg:flex">
//             {", followed by "}
//             {aircraftDom(aircraft[1], inbound)}
//           </span>
//         );
//       }
//       return dom;
//     } else {
//       return "none in range";
//     }
//   }
//
//   /**
//    * Parse the WebSocket message and build the data object
//    */
//   function parseMessage(event) {
//     try {
//       const data = JSON.parse(event.data);
//
//       const result = {
//         arriving: domify(data.arriving, true),
//         arrived: domify(data.arrived, true),
//         departing: domify(data.departing, false),
//         departed: domify(data.departed, false),
//         numInRange: _.get(data, "stats.numInRange", 0),
//       };
//
//       setAircraftData(result);
//     } catch (e) {
//       setAircraftData(initialAircraftData);
//     }
//   }
//
//   function initSocket() {
//     const init = async () => {
//       try {
//         const response = await fetch(TICKET_URL, { headers });
//         if (response.status === 200) {
//           const body = await response.json();
//           const ticket = _.get(body, "ticket", null);
//
//           if (ticket) {
//             // request broadcast pipe
//             const ws = new WebSocket(WS_URL);
//             ws.addEventListener("open", () => {
//               ws.send(JSON.stringify({ ticket }));
//             });
//             ws.addEventListener("close", () => {
//               setAircraftData(initialAircraftData);
//               setTimeout(init, SOCKET_RETRY_TIME);
//             });
//             ws.addEventListener("message", parseMessage);
//           } else {
//             // ticket likely expired so request a new one
//             setTimeout(init, SOCKET_RETRY_TIME);
//           }
//         } else if (response.status > 401) {
//           // some other issue with the server, so try again later
//           setTimeout(init, SOCKET_RETRY_TIME);
//         }
//         // otherwise, there is something wrong with the client, which is
//         // probably not going to heal itself, so just give up
//       } catch (e) {
//         // this does not indicate a 401, so try again later
//         setTimeout(init, SOCKET_RETRY_TIME);
//       }
//     };
//
//     init();
//   }
//
//   const initialAircraftData = {
//     arriving: "none in range",
//     arrived: "none in range",
//     departing: "none in range",
//     departed: "none in range",
//     numInRange: 0,
//   };
//
//   const [aircraftData, setAircraftData] = useState(initialAircraftData);
//   const [numInRange, setNumInRange] = useState(0);
//   const [direction, setDirection] = useState("up");
//
//   /**
//    * Request a ticket and a broadcast of aircraft data from serve1090
//    */
//   useEffect(initSocket, []);
//
//   /**
//    * Cache and compare current and previous numInRange to compute
//    * direction of the number spinner
//    */
//   useEffect(() => {
//     // check if new numInRange is greater or lesser than the current numInRange
//     const direction = aircraftData.numInRange > numInRange ? "down" : "up";
//     setDirection(direction);
//     setNumInRange(aircraftData.numInRange);
//   }, [aircraftData, numInRange]);
//
//   return (
//     <div className="flex flex-col mt-auto text-xl">
//       <div className="text-lg ml-3">
//         KDCA live feed
//         <sup className="ml-1 text-sm italic">
//           <a
//             href="https://github.com/r00b/roob1090"
//             target="_blank"
//             rel="noreferrer">
//             what's this?
//           </a>
//         </sup>
//       </div>
//       <div className="h-12 px-3 flex text-lg md:text-xl bg-black bg-opacity-25">
//         <div className="cycle w-full flex items-center relative overflow-hidden">
//           <div>
//             Arriving:<span>{aircraftData.arriving}</span>
//           </div>
//           <div>
//             Arrived:<span>{aircraftData.arrived}</span>
//           </div>
//           <div>
//             Departing:<span>{aircraftData.departing}</span>
//           </div>
//           <div>
//             Departed:<span>{aircraftData.departed}</span>
//           </div>
//         </div>
//         <div className="hidden sm:inline-flex items-center relative overflow-hidden whitespace-nowrap">
//           <TextTransition
//             text={aircraftData.numInRange}
//             direction={direction}
//             inline={true}
//             style={{
//               width: "auto",
//             }}
//           />
//           <span className="pl-1">aircraft in range</span>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default Aircraft;
