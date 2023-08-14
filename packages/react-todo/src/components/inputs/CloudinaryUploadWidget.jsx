import React from "react";

import { WidgetLoader, Widget } from "react-cloudinary-upload-widget";

export const CloudinaryUploadWidget = ({ onUpload }) => {
    return (
        <>
            <WidgetLoader />
            <Widget
                sources={["local", "camera", "dropbox"]}
                resourceType={"image"}
                cloudName={"dmm1qisfm"}
                uploadPreset={"mcqallbj"}
                buttonText={"Upload"}
                x
                style={{
                    color: "white",
                    border: "none",
                    width: "120px",
                    backgroundColor: "blue",
                    borderRadius: "4px",
                    height: "25px",
                }}
                folder={"todoUsers"}
                cropping={false}
                multiple={false}
                autoClose={false}
                onSuccess={(result) => {
                    return onUpload(result.info);
                }}
                onFailure={(error) => error}
                logging={false}
                customPublicId={"sample"}
                eager={"w_400,h_300,c_pad|w_260,h_200,c_crop"}
                use_filename={false}
                destroy={true}
                widgetStyles={{
                    palette: {
                        window: "#737373",
                        windowBorder: "#FFFFFF",
                        tabIcon: "#FF9600",
                        menuIcons: "#D7D7D8",
                        textDark: "#DEDEDE",
                        textLight: "#FFFFFF",
                        link: "#0078FF",
                        action: "#FF620C",
                        inactiveTabIcon: "#B3B3B3",
                        error: "#F44235",
                        inProgress: "#0078FF",
                        complete: "#20B832",
                        sourceBg: "#909090",
                    },
                    fonts: {
                        default: null,
                        "'Fira Sans', sans-serif": {
                            url: "https://fonts.googleapis.com/css?family=Fira+Sans",
                            active: true,
                        },
                    },
                }}
            />
        </>
    );
};
