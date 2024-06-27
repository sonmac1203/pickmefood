// src/components/EventCard.jsx

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PaymentPage from "../CheckOutForm/PaymentPage";
import useUser from "@/hook/useUser";
import { current } from "@reduxjs/toolkit";
import updateEvent from "../../../../updateEvent";
const EventCard = async ({ event, userId }) => {
  // await updateEvent()
  const {
    image,
    eventName,
    expirationDate,
    description,
    money,
    location,
    organizationName,
    _id,
    progress,
    likes = [],
    comments = [],
  } = event;
  const currentUser = useUser(userId).user;
  const [progressStick, setProgress] = useState(0);
  const [remainingMoney, setRemainingMoney] = useState(money);
  const [isLiked, setIsLiked] = useState(likes.includes(currentUser));
  const [likesCount, setLikesCount] = useState(likes.length);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(`/api/events/${_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch progress");
        }
        const data = await response.json();
        const currentProgress = (progress / money) * 100;
        setProgress(currentProgress);
        setRemainingMoney(money - progress);
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [_id, money]);

  const handleLike = async () => {
    try {
      const modifiedEvent = { ...event };

      if (isLiked) {
        await modifiedEvent.likes.splice(
          modifiedEvent.likes.indexOf(currentUser),
          1
        );
        setLikesCount((prevCount) => prevCount - 1);
      } else {
        await modifiedEvent.likes.push(currentUser);
        setLikesCount((prevCount) => prevCount + 1);
      }
      const response = await fetch(`/api/events/${_id}`, {
        method: "PUT",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedEvent),
      });

      if (!response.ok) {
        throw new Error("Failed to update like status");
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="event-card bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={image}
        alt={eventName}
        className="card-image w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className="card-title text-xl font-semibold text-gray-800">
            {eventName}
          </h2>
          <div className="date-box bg-white text-gray-700 border border-gray-300 px-2 py-1 rounded shadow-sm">
            <span className="text-xs">{expirationDate}</span>
          </div>
        </div>
        <p className="card-organization text-sm text-gray-600 mb-1">
          {organizationName}
        </p>
        <p className="card-location text-sm text-gray-600 mb-1">{location}</p>
        <p className="card-description text-sm text-gray-600 mb-2 flex-grow">
          {description}
        </p>
        <div className="mb-4">
          <div className="card-progress h-4 bg-gray-200 rounded-full mb-1">
            <div
              className="card-progress-bar h-full bg-blue-500 rounded-full"
              style={{ width: `${progressStick}%` }}
            ></div>
          </div>
          <p className="card-funding-info text-sm text-gray-700">
            To be funded: ${remainingMoney} (${progress.toFixed(2)}% funded)
          </p>
        </div>
        <button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</button>
        <p>Likes: {likesCount}</p>

        <Dialog>
          <DialogTrigger>
            <Button className="bg-sky-400">Donate</Button>
          </DialogTrigger>
          <DialogContent className="min-w-fit w-3/4 h-4/5">
            <PaymentPage eventId={_id}></PaymentPage>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EventCard;
