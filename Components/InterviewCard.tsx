import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import DisplayTechIcons from "@/Components/DisplayTechIcons";
import { getFeedbackByinterviewId } from "@/lib/actions/general.action";
import ToastButton from "@/Components/ToastButton"; // Import the ToastButton component

const InterviewCard = async ({
  userId,
  interviewId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByinterviewId({
          interviewId,
          userId,
        })
      : null;
  const noramlizedType = /mix/gi.test(type) ? "Mixed" : type;
  const forrmattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D,YYYY");

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
            <p className="badge-text">{noramlizedType}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px] "
          />
          <h3 className="mt-5 capitalize">{role} Interview</h3>
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                alt="calendar"
                width={22}
                height={22}
              />
              <p>{forrmattedDate}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" alt="star" width={22} height={22} />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>
          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ||
              "You haven't taken the interview yet. Take it now to improve your skills"}
          </p>
        </div>
        <div className="flex flex-row justify-between ">
          <DisplayTechIcons techStack={techstack} />
          <ToastButton
            className="btn-primary "
            href={
              feedback
                ? `/interview/${interviewId}/feedback`
                : `/interview/${interviewId}`
            }
            message={
              feedback
                ? "Redirecting to feedback page..."
                : "Redirecting to take the interview..."
            }
            label={feedback ? "Check Feedback" : "Take an Interview"}
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
