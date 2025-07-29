// src/components/ReadExif.tsx
import React, { useEffect, useState } from 'react';
import * as exifr from 'exifr';

const MetaDataReader = ({imageName}) => {
    const [metadata, setMetadata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [debugInfo, setDebugInfo] = useState(null);

    useEffect(() => {
        const fetchImageAndExtractExif = async () => {
            try {
                setLoading(true);
                setError(null);
                setDebugInfo(null);
                
                // Fetch the image as a blob
                const response = await fetch(`${process.env.PUBLIC_URL}/images/${imageName}`);
                const blob = await response.blob();
                
                // Debug info
                setDebugInfo({
                    blobSize: blob.size,
                    blobType: blob.type,
                    responseStatus: response.status,
                    responseOk: response.ok
                });
                
                console.log('Blob info:', {
                    size: blob.size,
                    type: blob.type
                });
                
                // Try parsing with different options
                const exifData = await exifr.parse(blob, {
                    // Try to parse all possible metadata
                    tiff: true,
                    xmp: true,
                    icc: true,
                    iptc: true,
                    jfif: true,
                    ihdr: true,
                    // Don't throw on unknown format
                    skipUnknown: true
                });
                
                console.log('EXIF data:', exifData);
                setMetadata(exifData);
                
            } catch (error) {
                console.error('Failed to read EXIF data:', imageName, error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchImageAndExtractExif();
    }, []);

    return (
        <div>
            {metadata && !loading && (
                <div>
                    <h3>Metadata:</h3>
                    {/* <pre>{JSON.stringify(metadata?.DateTimeOriginal, null, 2)}</pre>
                    <pre>{JSON.stringify(metadata?.XPComment, null, 2)}</pre> */}
                </div>
            )}
        </div>
    );
};

export default MetaDataReader;
