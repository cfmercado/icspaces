import { Divider, Grid, Stack, Typography, Button } from "@mui/material";
import roomImage from "../assets/room_images/ICS_2.jpg";
import roomImage2 from "../assets/room_images/ICS_3.jpg";
import React, { ChangeEvent, } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

interface RoomPhotosProps {
    roomID: any;
  }

const RoomPhotos  : React.FC<RoomPhotosProps> = ({
    roomID
  }) => {
    const [allImages, setAllImages] = useState<AllPhotos []>([]);
    const [image, setImage] = useState<File | null>(null);
    const [photoName, setPhotoName] = useState<string>("");
    interface AllPhotos {
        id: number;
        url: string;
    }
    
    useEffect(() => {
        const getPhotos = async () => {
          try {
            const photos = await fetch(
              "https://api.icspaces.online/get-room-image",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ room_id: roomID }),
              }
            );
            if (!photos.ok) {
              throw new Error("Failed to fetch room images");
            }
    
            const imagesData = await photos.json();
            setAllImages(imagesData.images);
                
          }catch (error) {
            console.error("Failed to fetch images:", error);
          }
        }
        getPhotos();
      }, [roomID, image]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
        setImage(selectedImage);
        setPhotoName(selectedImage.name);
    }
    };
    const deletePhoto = (image_id:number) => {
        const confirmed = window.confirm("Are you sure you want to delete this photo?");
        if (confirmed){
          try {
            fetch("https://api.icspaces.online/delete-room-image", {
              method: "POST",
              headers: {'Content-Type': 'application/json',},
              body: JSON.stringify({file_id: image_id}),
            })
              .then((response) => {
                if (!response.ok) {
                  window.alert("Error in deleting the photo! Please try again.");
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then((data) => {console.log(data);})
          } catch (error) {
            console.error("Error deleting photo:", error);
          }
          window.location.reload();
        }
      };

    useEffect(() => {
        const getPhotos = async () => {
            try {
                const formData = new FormData();
                if (image && roomID) {
                    formData.append("image", image);
                    formData.append("room_id", roomID);
                }
                await fetch("https://api.icspaces.online/upload-room-image", {
                method: "POST",
                body: formData,
            })
                .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
                })
                .then((data) => console.log(data))
                .then(() => {
                  window.location.reload();
                })
                .catch((error) => console.error("Error:", error));
            }catch (error) {                
                console.error("Error adding room image:", error);
            }
        }
        getPhotos();
    },[image]);

    return(
        <Stack direction='column' spacing={1} sx={{overflow:'auto'}}>
            <Divider />
            <Typography
                variant='h4'
                fontWeight='bold'
                sx={{textAlign:'start'}}
            > Current Photos</Typography>

            <Grid container spacing={1}>
                {allImages.map((item, index) => (
                    <Grid item xs={3} key={index} height= "80%" width='80%'> 
                        <Button variant="contained" size="small"
                        onClick={() => deletePhoto(allImages[index].id)} 
                        sx={{
                            position:'absolute', 
                            borderRadius: '50%',
                            minWidth: 0,
                            padding: 0,
                            backgroundColor: '#CCCCCC',
                            color: 'black',
                            '&:hover': {
                                backgroundColor: 'lightgrey',
                              }
                            }}>
                            <CloseIcon/>
                        </Button>
                        <img src={allImages[index].url} style={{borderRadius: '16px', position:'static'}} height='100%' width='100%' />
                    </Grid>
                ))}
                <Grid item xs={3}>
                    <input
                    accept="image/*"
                    id="image-upload"
                    type="file"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    />
                    <label htmlFor="image-upload">
                    <Button
                        component="span"
                        variant="contained"
                        startIcon={<AddCircleOutlineIcon />}
                        sx={{width: '100%',
                        height: '138px',
                        backgroundColor: '#e0e0e0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '16px',
                        border: '1px solid #ccc','&:hover': {
                            backgroundColor: 'lightgrey',
                          }}}
                    >
                    </Button>
                    </label>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default RoomPhotos;