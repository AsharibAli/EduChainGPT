"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import LoginButton from "../components/LoginButton";

interface DecodedToken {
  user_id: number;
  eth_address: string;
  edu_username: string;
  iss: string;
  iat: number;
  exp: number;
  aud: string;
  [key: string]: any;
}

const EduChainGPT = () => {
  const { authState } = useOCAuth();
  const [userInfo, setUserInfo] = useState<DecodedToken | null>(null);

  useEffect(() => {
    if (authState.idToken) {
      const decoded = jwtDecode<DecodedToken>(authState.idToken);
      setUserInfo(decoded);
    }
  }, [authState.idToken]);

  return (
    <div className="min-h-screen flex flex-col items-center pt-8">
      <Card className="w-full max-w-lg mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            EduChainGPT
          </CardTitle>
          <CardDescription className="text-center">
            {userInfo
              ? "You're connected with OCID!"
              : "Connect with OCID to access the EduChainGPT on EduChain."}
          </CardDescription>
          <CardDescription className="text-center">
            {userInfo
              ? "Let's Build cool dApps on EduChain."
              : "Connect with OCID to access the EduChainGPT on EduChain."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {userInfo ? (
            <div className="text-center">
              <p className="font-semibold">Hello, {userInfo.edu_username}!</p>
              <p className="text-sm text-gray-600">
                Wallet: {userInfo.eth_address}
              </p>
            </div>
          ) : (
            <LoginButton />
          )}
        </CardContent>
      </Card>

      {userInfo && (
        <div className="w-full">
          <flowise-fullchatbot></flowise-fullchatbot>
          <Script
            src="https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
            type="module"
            strategy="lazyOnload"
            onLoad={() => {
              if (window.Chatbot) {
                window.Chatbot.initFull({
                  chatflowid: process.env.NEXT_PUBLIC_CHATFLOW_ID,
                  apiHost: process.env.NEXT_PUBLIC_FLOWISE_API_HOST,
                  theme: {
                    button: {
                      backgroundColor: "#008080",
                      size: "medium",
                      iconColor: "white",
                      dragAndDrop: true,
                    },
                    autoWindowOpen: {
                      autoOpen: true,
                      openDelay: 2,
                      autoOpenOnMobile: true,
                    },
                    chatWindow: {
                      showTitle: true,
                      title: "🤖 EduChainGPT (Build your dApps on EduChain) ✨",
                      welcomeMessage:
                        "Welcome to EduChainGPT! I'm here to help you learn and build your educational dApps on EduChain 👈",
                      errorMessage:
                        "Unable to retrieve data from the server. Please try again later.",
                      backgroundColor: "#ffffff",
                      fontSize: 16,
                      botMessage: {
                        backgroundColor: "#008080",
                        textColor: "#ffffff",
                        showAvatar: true,
                        avatarSrc:
                          "https://raw.githubusercontent.com/AsharibAli/project-images/refs/heads/main/educhaingpt.png",
                      },
                      userMessage: {
                        backgroundColor: "#000000",
                        textColor: "#ffffff",
                        showAvatar: true,
                        avatarSrc:
                          "https://raw.githubusercontent.com/AsharibAli/project-images/refs/heads/main/usericon.png",
                      },
                      textInput: {
                        placeholder: "Type your question here...",
                        backgroundColor: "#ffffff",
                        textColor: "#000000",
                        sendButtonColor: "#000000",
                        maxChars: 500,
                        maxCharsWarningMessage:
                          "You exceeded the characters limit. Please input less than 500 characters.",
                        autoFocus: true,
                        sendMessageSound: true,
                        receiveMessageSound: true,
                      },
                      feedback: {
                        color: "#000000",
                      },
                      footer: {
                        textColor: "#000000",
                        text: "Build with ❤️ by",
                        company: "EduHub 📚",
                        companyLink: "https://eduhub.dev/",
                      },
                    },
                  },
                });
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EduChainGPT;
