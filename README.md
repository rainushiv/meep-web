# Meep Social Media

Developed a lightweight, self-hosted social media platform with React.js front-end and a Hono + Bun backend,  
featuring real-time chat, advanced search, and secure deployment. Designed for responsive user interaction and  
scalable data handling.

---

##  Live Demo
 [Live Site](https://shivalry.dev)  

> **Note:** The live demo does not include Elasticsearch because the container is too resource-intensive for the Hetzner server.
If you’d like to see it in action, check out the demo video below. Also, I did not focus too much on the frontend so if your screen is considerably larger or smaller the UI will not look correct.

---

##  Live video (Elasticsearch/websocket)

The reason you don't see avatars in the searchbar is due to there being 10k+ users in the databse and all the images are stored in an s3 bucket. s3 only allows for 2k put requests
before they begin charging so i opted out of putting avatars for the 10k users. 


[Websocket](https://github.com/user-attachments/assets/bebd9b64-8822-49a9-8db1-88575889fb06)

[Elasticsearch](https://github.com/user-attachments/assets/e9d9eefc-88fb-418d-a42c-e3dd8acae6a2)


