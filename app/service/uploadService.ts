import axios from 'axios';

const UPLOAD_URL = 'http://localhost:8080/elephant/addElephant'; // Your backend URL

interface UploadResponse {
    status: number;
    message: string;
}

const uploadImageAndLocation = async (
    imageFile: File,
    latitude: number,
    longitude: number
): Promise<UploadResponse> => {
    const formData = new FormData();

    formData.append('image', imageFile);
    formData.append('latitude', latitude.toString());
    formData.append('longitude', longitude.toString());

    try {
        const response = await axios.post(UPLOAD_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return {
            status: response.status,
            message: response.data.message || 'Image and location uploaded successfully.',
        };
    } catch (error: any) {
        return {
            status: error.response?.status || 500,
            message: error.message || 'An error occurred while uploading.',
        };
    }
};

export default {
    uploadImageAndLocation,
};
