"use client"
import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, RouteEditor, GeolocationControl, SearchControl, RoutePanel, FullscreenControl } from '@pbe/react-yandex-maps';

const mapState = {
    center: [45.03547, 38.975313], // Краснодар
    zoom: 7,
};

const YandexMapPage = ({ businessCoords }) => {
    const [isMapRendered, setIsMapRendered] = useState(false);
    const [placemarks, setPlacemarks] = useState([]);

    useEffect(() => {
        setIsMapRendered(true);
        // Если координаты бизнеса переданы, добавляем метку
        if (businessCoords) {
            setPlacemarks([...placemarks, {
                geometry: { type: "Point", coordinates: businessCoords },
                properties: { balloonContent: 'Бизнес' },
            }]);
        }
    }, [businessCoords]);

    const onMapClick = (e) => {
        const coords = e.get('coords');
        const description = prompt('Введите описание для места:', 'Описание места');
        if (description) {
            const newPlacemark = {
                geometry: { type: "Point", coordinates: coords },
                properties: { balloonContent: description },
            };
            setPlacemarks([...placemarks, newPlacemark]);
        }
    };

    const onPlacemarkContextMenu = (index) => {
        setPlacemarks(placemarks.filter((_, i) => i !== index));
    };

    return (
        <YMaps query={{ apikey: process.env.NEXT_PUBLIC_YANDEX_MAP_API_KEY }}>
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="rounded-xl overflow-hidden shadow-lg border-gray-200 border w-full md:w-3/4 h-3/4">
                    {isMapRendered && (
                        <Map state={mapState} width="100%" height="100%" onClick={onMapClick}>
                            {placemarks.map((placemark, index) => (
                                <Placemark
                                    key={index}
                                    geometry={placemark.geometry}
                                    properties={placemark.properties}
                                    onContextMenu={() => onPlacemarkContextMenu(index)}
                                    options={{
                                        preset: "islands#greenDotIcon",
                                    }}
                                />
                            ))}
                            <RouteEditor options={{ routeStrokeColor: "FFA500", routeStrokeStyle: "solid" }} />
                            <RoutePanel options={{ float: 'right' }} />
                            <GeolocationControl options={{ float: "left" }} />
                            <SearchControl options={{ float: 'right' }} />
                            <FullscreenControl />
                        </Map>
                    )}
                </div>
            </div>
        </YMaps>
    );
};

export default YandexMapPage;
