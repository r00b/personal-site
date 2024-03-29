import React, { useEffect, useState } from "react";
import "../styles/components/aircraft.scss";
import _ from "lodash";
import loadable from "@loadable/component";
// react-text-transition cannot do SSR
const TextTransition = loadable(() => import("react-text-transition"));

const SOCKET_RETRY_TIME = 5000;

const Aircraft = () => {
  /**
   * Format the text that goes into aircraft DOM, adding extra
   * data if it is available
   */
  function formatText(ac, inbound) {
    let text = `${ac.flight}`;
    if (ac.type) {
      text += `, ${ac.type}`;
    }
    if (inbound && ac.origin) {
      text += ` from ${ac.origin}`;
    } else if (!inbound && ac.destination) {
      text += ` to ${ac.destination}`;
    }
    return text;
  }

  /**
   * DOM-ify an individual aircraft object
   */
  function aircraftDom(ac, inbound) {
    return (
      <a
        className="ml-1"
        target="_blank"
        rel="noreferrer"
        href={"https://flightaware.com/live/flight/" + ac.flight}>
        {formatText(ac, inbound)}
      </a>
    );
  }

  /**
   * Build the DOM that defines tracking data
   */
  function domify(aircraft, inbound = false) {
    if (_.get(aircraft, "length")) {
      const first = aircraft[0];
      const second = aircraft[1];
      const dom = [<span key={first.hex}>{aircraftDom(first, inbound)}</span>];
      if (second) {
        dom.push(
          <span key={second.hex} className="hidden lg:flex">
            , followed by
            {aircraftDom(second, inbound)}
          </span>
        );
      }
      return dom;
    } else {
      return <span className="ml-1">none in range</span>;
    }
  }

  const getArr = array => {
    return array || [];
  };

  /**
   * Parse the WebSocket message and build the data object
   */
  function parseMessage(event) {
    try {
      const data = JSON.parse(event.data);

      const result = {
        arriving: getArr(data.arriving),
        arrived: getArr(data.arrived),
        departing: getArr(data.departing),
        departed: getArr(data.departed),
        onRunway: getArr(data.departed),
        numInRange: _.get(data, "stats.validAircraftCount", 0),
      };

      setAircraftData(result);
    } catch (e) {
      setAircraftData(initialAircraftData);
    }
  }

  /**
   * Attach a WebSocket to receive aircraft data
   */
  function initSocket() {
    const ws = new WebSocket(process.env.GATSBY_SERVE1090_URL);
    ws.addEventListener("open", () => {
      // send initial auth token
      ws.send(JSON.stringify({ token: process.env.GATSBY_SERVE1090_TOKEN }));
    });
    ws.addEventListener("close", () => {
      ws.removeEventListener("message", parseMessage);
      setAircraftData(initialAircraftData);
      setTimeout(initSocket, SOCKET_RETRY_TIME);
    });
    ws.addEventListener("message", parseMessage);
  }

  const initialAircraftData = {
    arriving: [],
    arrived: [],
    departing: [],
    departed: [],
    numInRange: 0,
  };

  const [aircraftData, setAircraftData] = useState(initialAircraftData);
  const [numInRange, setNumInRange] = useState(0);
  const [direction, setDirection] = useState("up");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(initSocket, []);

  /**
   * Cache and compare current and previous numInRange to compute
   * direction of the number spinner
   */
  useEffect(() => {
    // check if new numInRange is greater or lesser than the current numInRange
    const direction = aircraftData.numInRange > numInRange ? "down" : "up";
    setDirection(direction);
    setNumInRange(aircraftData.numInRange);
  }, [aircraftData, numInRange]);

  return (
    <div className="flex flex-col mt-auto text-xl">
      <div className="text-lg ml-3">
        KAUS live feed
        <sup className="ml-1 text-sm italic">
          <a
            href="https://github.com/r00b/roob1090"
            target="_blank"
            rel="noreferrer">
            what's this?
          </a>
        </sup>
      </div>
      <div className="h-12 px-3 flex text-lg md:text-xl bg-black bg-opacity-25">
        <div className="cycle w-full flex items-center relative overflow-hidden">
          <div>Arriving:{domify(aircraftData.arriving, true)}</div>
          <div>Arrived:{domify(aircraftData.arrived, true)}</div>
          <div>Departing:{domify(aircraftData.departing)}</div>
          <div>Departed:{domify(aircraftData.departed)}</div>
        </div>
        <div className="hidden sm:inline-flex items-center relative overflow-hidden whitespace-nowrap">
          <TextTransition
            text={aircraftData.numInRange}
            direction={direction}
            inline={true}
            style={{
              width: "auto",
            }}
          />
          <span className="pl-1">aircraft in range</span>
        </div>
      </div>
    </div>
  );
};

export default Aircraft;
