# Nuber Eats

The Backend of Uber Eats Clone

# Purpose of Project
Learning NestJS, GraphQL and deploy it to Cloud service with CI/CD.

※ Basic code of this repository is similar with Nomad Coder online lecture. 
※ Things I have done without lecture contents:
Infra: AWS Services (Elastic Container Service, Elastic Container Registry, Auto Scaling(EC2), Application Load Balancer, Cloudfront, S3, Route53), CI/CD(Github Actions)
Backend: Conditional Configuration(DB configuration, Applying SSL, Enabling CORS), restaurant search method, some indices and transactions
Frontend: React Router 6, graphql-codegen, Search Page

## Backend Infra structrue
![nuber-eats](https://github.com/de1eb/nuber-eats-backend/assets/34806504/14c645eb-e7ab-4188-a940-7e7e3c52ce1f)

## Entity–relationship model(ERD)



## User Model:
- id
- createdAt
- updatedAt

- email
- password
- role(client|owner|delivery)

## User CRUD:

- Create Account
- Log In
- See Profile
- Edit Profile
- Verify Email
