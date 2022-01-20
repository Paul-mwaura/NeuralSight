import React, { useState, createContext, FC} from 'react';

export type ImageContextState = {
  image: any[],
  addImage: (name: any[]) => void;
};

const defaultState: ImageContextState = {
    image: [],
    addImage: () => { }
};

export const ImageContext = createContext<ImageContextState>(defaultState);

export const ImageProvider: FC = ({children}) => {
    const [image, setImage] = useState<any[]>(defaultState.image);

    const addImage = (newImage: any[]) => setImage((image: any[]) => [newImage]);
    return (
        <ImageContext.Provider value={{ image, addImage }}>
            {children}
        </ImageContext.Provider>
    );
}