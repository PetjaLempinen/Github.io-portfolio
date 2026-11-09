const skillsData = [
    { label: "Languages", items: ["Python", "C++", "SQL", "MATLAB"] },
    { label: "ML & Data", items: ["pandas", "NumPy", "scikit-learn", "PyTorch", "PySpark"] },
    { label: "Web & Apps", items: ["FastAPI", "Flask", "Streamlit", "Tkinter"] },
    { label: "Data Engineering & DevOps", items: ["Apache Airflow", "Docker", "Git & GitHub", "CMake", "Linux"] },
    { label: "Databases & Storage", items: ["PostgreSQL", "MySQL", "MinIO"] },
    { label: "Cloud", items: ["AWS"] },
    { label: "Environments", items: ["Jupyter"] }
];

const projectsData = [
    {
        title: "High performance python extension made in c++",
        description: "A high-performance computational extension that bridges the gap between C++ and Python. This project demonstrates how to bypass Python performance bottlenecks by offloading heavy data processing logic into native C++ modules using pybind11. This project uses a A* pathfinder algorithm as a good example, due to its slowness in python.",
        tags: ["Python", "C++", "CMake", "pybind11"],
        githubUrl: "https://github.com/PetjaLempinen/High-performance-python-extension/tree/main",
        image: "images/projects/Astar_pathfinder.png"
    },
    {
        title: "Neural network visualizer using numpy",
        description: "This project includes a full neural network model with using RELU and Sigmoid activation functions. Visualizer shows how the neural network succeeds in prediction. Background colours are the predictions and datapoints are the true values.",
        tags: ["Python", "Matplotlib", "Numpy"],
        githubUrl: "https://github.com/PetjaLempinen/-Interactive-Neural-Network-Decision-Boundary-Visualizer",
        image: "images/projects/NNW.png"
    },
    {
        title: "Big Data Engineering school project for NYtaxidata",
        description: "End-to-end big data pipeline school project built on NYC TLC High Volume For-Hire Vehicle (FHVHV) trip records. The project ingests raw Parquet data, processes it through a Spark medallion architecture, stores every layer in a MinIO S3-compatible data lake, and surfaces analytical results through a FastAPI REST API.",
        tags: ["Python", "PySpark", "Apache Spark", "MinIO", "DuckDB", "FastAPI + Uvicorn", "Docker"],
        githubUrl: "https://github.com/PetjaLempinen/Big_Data_Engineering_Project",
        image: "images/projects/BDE.png"
    },
    {
        title: "CNN image classifier with webcam integration",
        description: "Modular deep learning project built with PyTorch that implements a Convolutional Neural Network from scratch to classify the CIFAR-10 dataset. This project includes fully separated components for model architecture, dataset management, training, single-image inference, and real-time webcam classification.",
        tags: ["Python", "PyTorch", "OpenCV", "Pillow"],
        githubUrl: "https://github.com/PetjaLempinen/Modular_Image_Classifier",
        image: "images/projects/CNN_image.png"
    },
    {
        title: "Database project for budgeting",
        description: "Local database creation for learning SQL and database design. Includes simulated data for six core tables: User, Category, PaymentMethod, Budget, Income and Expenses. The database is managed through phpMyAdmin, providing a user‑friendly interface for administration and visualization.",
        tags: ["MySQL", "LAMP stack UwAmp", "Schema tools"],
        githubUrl: "https://github.com/PetjaLempinen/Own_Database_Project",
        image: "images/projects/Database_schema.png"
    },
    {
        title: "Stock data ETL pipeline simulation",
        description: "This project demonstrates how to extract structured financial data, inject realistic inconsistencies and missing values, and transform it into a clean, SQL-ready format.",
        tags: ["Python", "Pandas", "Matplotlib", "Numpy", "MySQL", "Jupyter NB"],
        githubUrl: "https://github.com/PetjaLempinen/Stock_Data_ETL_Pipeline_Simulation",
        image: "images/projects/kuvaajat.png"
    }
];

const certsData = [
    {
        issuer: "AWS / Cloud",
        title: "AWS Certified Data Engineering",
        description: "Validates expertise in building and securing data analytics infrastructure on AWS.",
        image: "images/certs/AWS_Data.png"
    },
    {
        issuer: "AWS / Cloud",
        title: "AWS Cloud Foundations",
        description: "Covers foundational cloud concepts, core AWS services, security, architecture, and pricing.",
        image: "images/certs/AWS_Cloud.png"
    },
    {
        issuer: "Matlab",
        title: "Matlab OnRamp",
        description: "Covers foundational Matlab basics.",
        image: "images/certs/Matlab.png"
    }
];
