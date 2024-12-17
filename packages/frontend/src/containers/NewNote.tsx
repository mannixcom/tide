import React, { useState } from "react";
import { API } from "aws-amplify";
import Form from "react-bootstrap/Form";
import { TideType } from "../types/note";
import Stack from "react-bootstrap/Stack";
import { onError } from "../lib/errorLib";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
//import config from "../config";
import "./NewNote.css";

export default function NewNote() {

  const nav = useNavigate();
  const [tideForm, setTideForm] = useState<TideType>({
    latitude: 0,
    longitude: 0,
    tag: '',
    data: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // function validateForm() {
  //   return tideForm.array.forEach(element => {
  //     map(tide => tide.length > 0)
  //   });
  // }

  // function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   if (event.currentTarget.files === null) return;
  //   file.current = event.currentTarget.files[0];
  // }
  function handleFormUpdate(event: React.ChangeEvent<HTMLInputElement>){
    const {name, value} = event.target;
    console.log(name, value)
    setTideForm((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function createNote(tide: TideType) {
    return API.post("tides", "/location", {
      body: tide,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    try {

      await createNote(tideForm);
      nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="NewNote">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="latitude">
          <Form.Control
            value={tideForm.latitude}
            name={'latitude'}
            onChange={handleFormUpdate}
          />
        </Form.Group>
        <Form.Group controlId="longitude">
          <Form.Control
            value={tideForm.longitude}
            name={"longitude"}
            onChange={handleFormUpdate}
          />
        </Form.Group>
        <Form.Group controlId="tag">
          <Form.Control
            value={tideForm.tag}
            as="textarea"
            onChange={handleFormUpdate}
          />
        </Form.Group>
        <Stack>
          <LoaderButton
            size="lg"
            type="submit"
            variant="primary"
            isLoading={isLoading}
          >
            Create
          </LoaderButton>
        </Stack>
      </Form>
    </div>
  );
}
