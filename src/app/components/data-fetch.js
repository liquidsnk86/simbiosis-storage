'use client'

import { useState, useEffect } from "react";
import supabase from "./util/supabase";

export const DataFetch = () => {
  const [newPost, setNewPost] = useState({
    id: "",
    articulo: "",
    nombre: "",
    precio: "",
    imagen: null,
    descripcion: "",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const allowedExts = ['jpg', 'jpeg', 'png'];

    if (!allowedExts.includes(fileExt)) {
      alert('Tipo de archivo no válido. Por favor, selecciona un archivo JPG, JPEG o PNG.');
      return;
    }

    setNewPost({ ...newPost, imagen: file });
  };

  const sendData = async () => {
    try {
      const { data: image, error: uploadError } = await supabase.storage
        .from('simbiosis')
        .upload('filename.' + newPost.imagen.name.split('.').pop(), newPost.imagen);

      if (uploadError) {
        console.error("Error al subir la imagen", uploadError);
        return;
      }

      const { data, error } = await supabase
        .from("simbiosis_articles")
        .upsert([{
          ...newPost,
          imagen: image.Key,
        }]);

      if (error) {
        console.error("Error al enviar datos", error);
      } else {
        console.log("Datos enviados correctamente", data);
      }
    } catch (error) {
      console.error("Error general", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendData();
  };

  useEffect(() => {
  }, [newPost]);

  return (
    <form onSubmit={handleSubmit} className="grid space-y-6 text-gray-600 border border-zinc-800 rounded-lg p-4">
      <input type="file" onChange={handleImageChange} className="text-zinc-100" />
      <input
        type='text'
        placeholder={''}
        className='placeholder:text-slate-100'
        onChange={(e) => setNewPost({ ...newPost, articulo: e.target.value })}
      />
      <input
        type='text'
        placeholder={''}
        className='placeholder:text-slate-100'
        onChange={(e) => setNewPost({ ...newPost, nombre: e.target.value })}
      />
      <input
        type='number'
        placeholder={''}
        className='placeholder:text-slate-100'
        onChange={(e) => setNewPost({ ...newPost, precio: e.target.value })}
      />
      <textarea
        placeholder={''}
        className='placeholder:text-zinc-400'
        maxLength={500}
        onChange={(e) => setNewPost({ ...newPost, descripcion: e.target.value })}
      />
      <button className="border rounded-md p-2 mx-2" type="submit">Enviar Datos</button>
    </form>
  );
};
