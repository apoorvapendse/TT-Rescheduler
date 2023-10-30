# TT-Rescheduler
A user-friendly website for college faculty to efficiently manage lecture schedules. Faculty members can request and coordinate schedule changes, including cancellations, preponements, and postponements, directly with other faculty. 

## What Does the Project Do?
It helps to schedule lectures of professors and also helps them to request a slot 
in a decentralised manner and the respective professor in charge of the slot gets to approve the request. 

The project has an admin panel where the admin will initialise the faculty account along with their initial timetable.
The faculties can later login with their credentials given by the admin to view their timetable in readonly format and also request a slot for a given room at a given day for a given hour.
The faculty having the room possesion at that instance is dynamically found via the database query.

If the faculty incharge of the room accepts the request, 
then both the incharge professors receive a mail about the change in their timetables and the acceptance of the request.
(implemented using nodemailer with gmail smtp)

This project is currently hosted on render. (ttrs.onrender.com)

The tech stack used involves Express MVC, EJS, CSS, MongoDB Atlas for hosting the database on cloud and render for deployment
