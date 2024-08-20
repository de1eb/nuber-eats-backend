# Nuber Eats
The Backend of Uber Eats Clone

# Purpose of Project
Learning NestJS, GraphQL and deploy it to Cloud service(AWS) with CI/CD, Docker, ECS(lastic Container Service).

# Backend Infra structrue
![nuber-eats](https://github.com/de1eb/nuber-eats-backend/assets/34806504/14c645eb-e7ab-4188-a940-7e7e3c52ce1f)

![Cloudfront General_id_deleted](https://github.com/user-attachments/assets/74a3f648-b513-4e0f-bae9-c502a4ad275d)
![Cloudfront Origins_modify](https://github.com/user-attachments/assets/80e8412f-ef73-4f04-becc-6b6866322180)
*nuber-eats.click.s3.ap-northeast-2.amazonaws.com S3 Origin where React Frontend app is uploaded and hosted
*nuber-eats.images.s3.ap-northeast-2.amazonaws.com S3 Origin where images used in frontend are saved
*api.nuber-eats.click Backend Application Load Balancer Address

The React application is uploaded to S3 and contacts users through Cloudfront.
When a user makes a request through Cloudfront, such as signing up for a membership, we send a 'POST' request to the application load balancer address inside the VPC (all requests are made via GraphQL).

![loadBalancer Details](https://github.com/user-attachments/assets/735312e9-1d3e-4376-9393-12843c290c84)
![loadBalancer Listners and Rules_id_deleted](https://github.com/user-attachments/assets/ee45ed5d-190d-411c-a0d3-e3af8c941e29)

The Application Load Balancer rejects incoming requests if they do not meet certain conditions. If they meet the conditions, they are sent to one of the associated target group (in this case, the AutoScaling group), taking into account the load of the instances.

![EC2 Target groups_id_deleted](https://github.com/user-attachments/assets/0e43e2c4-05fd-410a-94b0-106e6ad9259f)
![AutoScalingGroup 1_id_deleted](https://github.com/user-attachments/assets/9b3a33b3-c8ea-4f75-bcf0-ce7bfeff484e)
![AutoScalingGroup 2_id_deleted](https://github.com/user-attachments/assets/60540b9c-0719-48f4-bb3e-6bbcb1df01a4)

*Autoscaling group nuber-eats-container-instances is target group for the application load balancer. Load Balancer is not associated in above Screenshot. Because I take this screenshot while I'm deleting this project.
*This screenshot is taken while I'm deleting resources that incurr charges, so I set Desired capacity, Minimum capacity, Maximum capacity to 0 to terminate all instances.

The request arrives at a backend server running on an EC2 instance of Docker, which performs its role and sends responses, sending data to and from AWS RDS (PostgreSQL) as needed.

# CI/CD
https://github.com/de1eb/nuber-eats-backend/blob/main/.github/workflows/main.yml 
The Github Action will run unit tests, E2E tests if the 'Pull Request' or 'push' is in the main branch, and if it passes, it will create and upload a docker image to the Elastic Container Registry (ECR). After uploading, it will request ECS to add the newly created docker image address to an existing ECS task-definition to create a new one and update the service based on it.

![ECS Cluster_id_delete](https://github.com/user-attachments/assets/08917692-70b6-4fa9-a580-ab848e8507b9)
![ECS Cluster - Service_delete_id](https://github.com/user-attachments/assets/71572139-1292-4a75-8a59-bf8e87c356b4)

ECS replaces the Docker images on the EC2 instances by adding the task-definition passed to it and updating the service. It will also temporarily launch additional instances as needed. 
ECS also automatically increases the number of EC2 instances in an AutoScaling Group if the load becomes heavy and the average CPU utilization is above 70%.

## ETC

# Entity–relationship model(ERD)
![nuberEatsERD pgerd](https://github.com/user-attachments/assets/ad0c6d2b-8dcd-46fe-a627-fd835f562e21)

※ Basic code of this repository is similar with Nomad Coder online lecture. 
※ Things I have done without lecture contents:
Infra: AWS Services (Elastic Container Service, Elastic Container Registry, Auto Scaling(EC2), Application Load Balancer, Cloudfront, S3, Route53), CI/CD(Github Actions)
Backend: Conditional Configuration(DB configuration, Applying SSL, Enabling CORS), restaurant search method
Frontend(https://github.com/de1eb/nuber-eats-frontend): React Router 6, graphql-codegen, Search Page 
