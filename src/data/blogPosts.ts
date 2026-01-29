export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  featured: boolean;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "why-tableau",
    title: "Why Tableau?",
    excerpt: "This is my journey of learning Tableau and trying to build awesome dashboards in the months to come.",
    content: `This is my journey of learning Tableau and trying to build awesome dashboards in the months to come. Although schoolwork is intense now, I find myself loving the hours I spend working on data and putting things together for insight.

## The Beginning

I learnt about Tableau last year, 2019. I was working on a project for school about the gender pay gap. I loved working with the dataset. As I silently gathered my thoughts on how to visualize and predict the salary per employee based on different factors, I found a little difficulty using python to visualize the exact things I wanted to see.

## The Moment of Discovery

This was the moment when the heavens opened and a light shone down on me; complete with the light bulb popping up so bright. That was the moment I fell in love with Tableau. I did not know anything about it, I had just used it for a map visualization and that was it. Thinking I had accomplished something great. 🙈

## Taking the Leap

In January as I presented my final project, I was excited I used a different tool and I got results. That day, I came home and called a friend who is based in London, telling him how I excited I got using Tableau and that I think we should learn how to use the tool.

That night, I did a little research, looking at different visualization boards and how to get started officially. I decided then to build my first dashboard with the superhero dataset I got from Kaggle. I had so much fun doing that. I also built a coronavirus (dataset also from Kaggle) viz; this I did with my friend in London. Each of us trying to come up with a viz to inform others of the outbreak.

## The Journey Continues

As weeks passed, I started teaching myself Tableau. Learning from blogs, YouTube, anywhere I could find an article. Although I am still learning and trying to perfect my craft, I just love to take a break from schoolwork and just play with data in Tableau.

I love the tool and I am hoping one day, I will become super good at it. Oh, I forgot, Tableau has a great community. So why not Tableau? Easy to get help and directions.`,
    category: "Tableau",
    readTime: "5 min read",
    date: "May 28, 2020",
    featured: true,
    image: "/blog/coronavirus-tracking-tableau.png",
  },
  {
    id: 2,
    slug: "my-workout-tracker-visualization",
    title: "My Workout Tracker Visualization",
    excerpt:
      "Coming home to Accra, Ghana has got me eating a lot. All the food I missed while I was away. Time to track those workouts!",
    content: `Coming home to Accra, Ghana has got me eating a lot. All the food I missed while I was away. I don't have a favourite food but not eating homemade delicious food for a while can give me a great appetite. It has just been a month and I feel I gained a 1000 pound – I know that is impossible. So I have decided to go on a 28-day challenge, with the help of bae to keep me on my toes 😅, regardless I am going through with this challenge.

![Dashboard Preview](/blog/workout-tracker-1.png)

To push through to the end, I woke up 4 am on 3rd August just thinking why not create a viz board since it has been forever a built one to kill two birds with a stone.

With today's post, I will quickly but efficiently run you through how I achieved the dashboard for both desktop view and mobile view in tableau.

With the dashboard, I wanted it to feel like an interaction that one would have with an actual app but first, I needed to have some inspiration and also build the dataset. I took to Pinterest to gather some ideas, eventually, I had two good ideas I wanted to go for. Here are the links to both ideas.

Now let's get to the dataset. I had control on the variables I needed, using google sheets I manually inputted the data and imported it into tableau. This is a good way to update the dashboard without having to manually update it. For the daily weather, I got the data from here and the daily motivation quotes from here.

## Shall we create the viz.

**Calendar first.** Below is how it looks. There are writings showing the days tho 😅 because my dashboard is black, i used a white font color. Anyways, let's do this 💪🏾

![Calendar View](/blog/workout-tracker-2.png)

1. Let's create a date part with months, right-click on the date in the dimension pane, select create on the pop-up menu and click on custom date.

2. Under detail, the select month the dart part, click ok. Hurray, you did it!!!!!!!

3. Drag the new date field in the dimension pane to columns

4. Drag date to columns, right-click and choose more to select weekday

5. Drag date again to row, right-click and choose more again to select week number

6. Drag date to text on the marks card, right-click and select day.

7. Now let's change the marks to circles.

8. To colour, I created a new field using the calculated field in tableau. Drag this new field to colour on the marks card. Click on the colour, and edit colours as needed.

![Calculated Field - Completed](/blog/workout-tracker-3.png)

The calendar is done. Showing our completed tasks, missed and yet to be completed.

## Target Tracking

Each day in August has a certain target to be completed. Shall we create the target then?

![Targets for Day](/blog/workout-tracker-4.png)

Icons used are downloaded from flaticons. Place these downloaded icons in the tableau repository folder on your computer. Now let's build.

1. create a new calculated field called today, to selected the current date as [Date] = today()

2. drag this new field to the filter box

3. drag measure names to filter box; we want to show multiple variables(selected the needed measures)

4. drag measure values to text on the marks card

5. select shapes on the marks card, and drag measure names to shapes

![Calculated Field - Today](/blog/workout-tracker-5.png)

Now let's customize the shapes. Click on shapes on the marks card, locate the icons downloaded and assigned them accordingly.

![Edit Shapes](/blog/workout-tracker-6.png)

Almost there 🤗 For the arrow doughnut chart, there is a great tutorial on how to achieve that by Toan Hoang. Do check it out.

## The Timeline Chart

The last viz chart is the timeline chart using the area chart.

![Timeline Chart](/blog/workout-tracker-7.png)

1. Drag date to the columns pane, right-click and select the exact date option

2. drag measure names to filter, select the needed measures, click on apply then ok

3. drag measure values to the rows pane

4. drag measure names to colour, edit colours as needed

## Adding Dynamic Elements

Now assemble the dashboard. Before we do that, I almost forgot about the time and the greetings 😅

1. create a new calculated field to display the time now. In the calculated field box, type NOW(), click apply then ok.

2. create exact date from the new field and change the date format to custom, typing in this h: mm AMPM after right-clicking, selecting default property, date format and custom.

3. drag the new calculated field to text on the marks card

4. let's create the last calculated field to help with the greetings, just as the above new field in the custom box for formating type in HH to get just the hours of time.

5. now for the greetings, the formula below

6. drag the greetings field to the text card.

7. click on the text card, and type in It's before the measure in the text box.

![Greeting Formula](/blog/workout-tracker-8.png)

**Note:** the other icons on the dashboard are either places as images, resizing to fit and others as buttons of a container layout that has either texts, colour legends or the to-do worksheets.

The layout of the dashboard was designed in figma and bought into tableau as a tiled image, fit to size as usual.

That's all for this simple yet fun dashboard.

Thank you for reading.

With love always ❤️😘`,
    category: "Tableau",
    readTime: "8 min read",
    date: "August 4, 2020",
    featured: true,
  },
  {
    id: 3,
    slug: "data-cleaning-to-machine-learning",
    title: "Data Cleaning to Machine Learning",
    excerpt:
      "A journey to re-learn Python and polish up my skills, from data cleaning to classification with the Titanic dataset.",
    content: `As part of my return journey to python project; this is a journey to re-learn python and polish up my skills, starting from the basics and climbing up to the advance; Machine Learning and Deep Learning, I look at data cleaning in python and classification under the supervised learning algorithms.

**In this blog post:**
- What is data cleaning?
- Understanding your data
- Data cleaning
- Understand the data more after cleaning
- Feature Engineering
- Data Encoding
- The Model
- The Prediction
- The Evaluation
- Tuning the Model
- Visualization of Accuracy
- Final Evaluation

## What is data cleaning?

This is the process of removing unwanted features, fixing or removing duplicates, incorrect entries, incomplete or missing values, incorrectly formatted data in the data to improve the quality of the data.

The term garbage in garbage out is very crucial in the data environment. That is when you use a poor dataset for analysis, you get very poor and incorrect insights. Similarly, poor dataset being fed into a machine learning or deep learning algorithm or model leads to poor performance.

## Understanding the data

Understanding your data leads you on the right path to cleaning the data and making the necessary wrangling to achieve your set goal with the data.

In this post, using python, I will show how to understand the features of a data in order to achieve clean data for analysis or machine learning algorithm.

The ultimate goal of the dataset being used here is to predict if an individual would survive or not on the Titanic shipwreck. This is a classification problem under supervised learning algorithms in data science. The titanic dataset can be found on Kaggle. The datasets of this task consist of a train and test datasets. The train dataset will be used to train the model, whereas the test set will be used for the prediction of the survived variable. Also, it consists of the survived dataset which serves as the actual survival of the test dataset, hence using it for evaluation of the model.

**Shall we begin?**

Let's first import some packages.

\`\`\`python
import numpy as np 
import pandas as pd 
import seaborn as sns 
import matplotlib.pyplot as plt
from scipy import stats
from sklearn.neighbors import KNeighborsClassifier
\`\`\`

\`\`\`python
#load dataset
train = pd.read_csv('train.csv')
test = pd.read_csv('test.csv')

#save passengerid to be used for later
passengerid = test['PassengerId']
train.head()
\`\`\`

From the above codes, loading in the train dataset and taking a look at this. The Passenger Id is saved to be used after the prediction for submission.

\`\`\`python
#dropping the passenger ids in both dataset, this does not have any correlation to whether an 
#individual will survive or not 
train, test = train.drop('PassengerId', axis = 1) , test.drop('PassengerId', axis = 1)
\`\`\`

The main aim of this is to predict the survival on the titanic. therefore survival is the target variable. First, performing summary statistics.

\`\`\`python
#Let's take a look at the dataset 
train["Survived"].describe()
\`\`\`

From the summary statistics performed, it can be seen that the mean of the survived is 0.383838 with a minimum of zero and maximum of 1. It is also known that females and children have a higher chance of surviving so as the higher class. Finding a correlation of the other variables and the target variable to know the effect they have on the target variable.

**How do the features in the dataset relates or behaves with the target variable?**

\`\`\`python
#finding the relationship between the survived and other variables 
correlation = train.corr()
correlation.sort_values(["Survived"])
correlation.Survived
\`\`\`

From the above, it can be seen that Pclass has higher correlation to survived compared to the rest. Therefore, the higher the class(1), the higher the chance of surviving(1). That is, if the class has a high number(3), the lower the chances of surviving.

## Data Cleaning

In this part, the data will be cleaned or wrangled to suit what we intend to do with it. Mainly checking for missing values and imputing them when necessary or relevant.

\`\`\`python
#concating the trainset and the testset for cleaning 
data = pd.concat((train, test))

#identifying missing values 
print(data.isnull().values.any())

#check for missing values
print(data.isnull().sum())
\`\`\`

The missing values are found in the Survived, Age, Cabin and Embark Features.

\`\`\`python
len(data)
\`\`\`

Out of 1309 entries, there are 1014 missing cabin values. Imputing this variable and using it in the prediction might not be advisable. Hence it will be ignored and dropped.

\`\`\`python
#dropping the cabin variable from the dataset since it is not so relevant in the prediction
dataset = data.drop('Cabin', axis = 1)
\`\`\`

For the age, the median would be used to impute the missing values.

\`\`\`python
median = dataset["Age"].median()
dataset["Age"].fillna(median, inplace = True)
\`\`\`

Same would be done for the fare variable.

\`\`\`python
median = dataset["Fare"].median()
dataset["Fare"].fillna(median, inplace = True)
\`\`\`

For the embarked variable, the mode would be used to fill out the missing values.

\`\`\`python
print(dataset["Embarked"].mode())
dataset["Embarked"].fillna("S", inplace = True)
\`\`\`

\`\`\`python
#checking if all the missing values have been imputed 
print(len(test))
dataset.isnull().values.any()
\`\`\`

From the above code, we find out that the missing values are in the survived feature, which is the target variable needed to be predicted for the test dataset. The number of the missing values make up the length of the test dataset (the number of the data entries in the test dataset).

## Understanding the dataset more

\`\`\`python
#finding out which sex has the higher chances of suviving 
print(dataset.groupby(["Sex"]).mean())

#finding which class has the higher chances of surviving 
print(dataset.groupby(["Pclass"]).mean())
\`\`\`

The upper class (1st) has higher chances of surviving. It is in line with the above correlation found. Whereby, when the class is lower that is 3, the chances of surviving is less.

From the above, females have a higher chance of surviving as compared to males with a survival rate of 0.74.

## Feature Engineering

Feature engineering is extracting features from data which helps in the performance of a machine learning algorithm. The right features can help improve the accuracy of the model hence it is a very crucial step.

\`\`\`python
#creating a new variable to tell if the passenger was traveling alone or with either a parent or a sibling 
dataset["Alone"]=np.where((dataset["SibSp"]+dataset["Parch"]) >0, 0, 1)

#finding out the chances of surviving if the passenger traveled alone 
dataset.groupby(["Alone"]).mean()
\`\`\`

There is a 50.6% chance that the passenger will survival if traveling alone.

\`\`\`python
#creating a new feature using the titles of the individual 
dataset["Title"] = dataset.Name.str.extract(' ([A-Za-z]+).', expand=False)
dataset.head()
\`\`\`

\`\`\`python
#making some adjustments to the titles 
for i in dataset:
    dataset["Title"] = dataset["Title"].replace("Mlle", "Miss")
    dataset["Title"] = dataset["Title"].replace("Ms", "Miss")
    dataset["Title"] = dataset["Title"].replace("Mme", "Mrs")
    dataset["Title"] = dataset["Title"].replace(["Lady", "Sir", "Countess", "Jonkheer"], "Royalty")
    dataset["Title"] = dataset["Title"].replace(["Capt", "Col", "Don", "Dona", "Major", 
                                                 "Dr","Rev", "Master"], "High rank")

#finding out the chances of surviving based on the title of the individual 
dataset[["Title","Survived"]].groupby(["Title"]).mean()
\`\`\`

Royalties have higher chances of surviving as compared to the other titles. Therefore, titles and alone features will be very relevant in this ML model since they have a correlation with the survived target variable.

\`\`\`python
#dropping the name column and the ticket column which is irrevelant to our prediction
dataset = dataset.drop(["Name", "Ticket"], axis = 1)
print(dataset.head())
dataset.info()
\`\`\`

## Data Encoding

This is converting categorical data into numerical or quantitative data which is easily understood by the model.

\`\`\`python
#age is a categorical data not numerical in this case. therefore, grouping the into children, youngster ... and 
#converting them into proper numerical values 
dataset["Age"].astype(int)
dataset.loc[ dataset['Age'] <= 11, 'Age'] = 0                             #Children
dataset.loc[(dataset['Age'] > 11) & (dataset['Age'] <= 18), 'Age'] = 1    #Teens
dataset.loc[(dataset['Age'] > 18) & (dataset['Age'] <= 22), 'Age'] = 2    #Youngsters
dataset.loc[(dataset['Age'] > 22) & (dataset['Age'] <= 27), 'Age'] = 3    #Young Adults
dataset.loc[(dataset['Age'] > 27) & (dataset['Age'] <= 33), 'Age'] = 4    #Adults
dataset.loc[(dataset['Age'] > 33) & (dataset['Age'] <= 40), 'Age'] = 5    #Middle Age
dataset.loc[(dataset['Age'] > 40) & (dataset['Age'] <= 66), 'Age'] = 6    #Senior
dataset.loc[ dataset['Age'] > 66, 'Age'] = 7                              #Retired
\`\`\`

\`\`\`python
#for fare
dataset.loc[ dataset['Fare'] <= 7.91, 'Fare'] = 0                                 #Extremely low
dataset.loc[(dataset['Fare'] > 7.91) & (dataset['Fare'] <= 14.454), 'Fare'] = 1   #very low
dataset.loc[(dataset['Fare'] > 14.454) & (dataset['Fare'] <= 31), 'Fare']   = 2   #low
dataset.loc[(dataset['Fare'] > 31) & (dataset['Fare'] <= 99), 'Fare']   = 3       #high
dataset.loc[(dataset['Fare'] > 99) & (dataset['Fare'] <= 250), 'Fare']   = 4      #very high
dataset.loc[ dataset['Fare'] > 250, 'Fare'] = 5                                   #extremely high

dataset = dataset.drop("Survived", axis = 1)
dataset.info()
\`\`\`

Changing all other categorical data into numerical data using the label encoder module from scikit-learn.

\`\`\`python
from sklearn.preprocessing import LabelEncoder
cols = ("Embarked","Sex", "Title")
for i in cols:
    le = LabelEncoder()
    dataset[i] = le.fit_transform(list(dataset[i]))
\`\`\`

For the above test, One Hot Encoding could have be used. Below is the code for that.

\`\`\`python
dataset=pd.get_dummies(dataset, columns=["Embarked","Sex", "Title"])
\`\`\`

## The Model

Building the model for training using the K-nearest neighbors (knn). First, let's set up our train and test datasets.

\`\`\`python
y_train = train["Survived"]
trainset_len = len(train)
x_train = dataset[:trainset_len]
x_test = dataset[trainset_len:]
\`\`\`

The model; building the knn model with the nearest neighbors as 1. The model behaves by looking at the nearest one old data point to predict what the new data point is.

\`\`\`python
KNN = KNeighborsClassifier(n_neighbors=1, metric = 'euclidean')
KNN.fit(x_train, y_train)
\`\`\`

## The Prediction

\`\`\`python
prediction = KNN.predict(x_test)
\`\`\`

To save the prediction as csv with the passenger ids:

\`\`\`python
Survived = pd.DataFrame(prediction)
Survived["PassengerId"] = passengerid
Survived = Survived.rename(columns={0: "Survived"})
Survived = Survived[["PassengerId","Survived"]]
Survived.to_csv("Submission.csv", index=False)
\`\`\`

## The Evaluation

\`\`\`python
#training Accuracy
train_accuracy = KNN.score(x_train, y_train)
train_accuracy
\`\`\`

The train accuracy is 90%, therefore was able to learn 90% of the train dataset.

For the test data, let's load the actuals for evaluation.

\`\`\`python
#load in the actuals 
y_test = pd.read_csv('gender_submission.csv', usecols = ['Survived'])
y_test = y_test.to_numpy()
y_test.shape

test_accuracy = KNN.score(x_test, y_test)
print(test_accuracy)

from sklearn.metrics import accuracy_score
accuracy_score(y_test, prediction)
\`\`\`

The test accuracy is 83%, therefore the model was able to accurately predict 83% of the dataset.

## Tuning the model

\`\`\`python
from sklearn.model_selection import GridSearchCV

params = {"n_neighbors": np.arange(1,9),
"metric": ["euclidean"]}

grid = GridSearchCV(estimator=KNN,
param_grid=params)

grid.fit(x_train, y_train)
print(grid.best_score_)
print(grid.best_estimator_.n_neighbors)
\`\`\`

From the above, it is seen that a number of 5 neighbors gives a better score in accuracy.

## Visualization of Accuracy

Visualizing the above for clarity.

\`\`\`python
mean_score = grid.cv_results_['mean_test_score']
k = np.arange(1,9)

plt.plot(k, mean_score)
plt.xlabel('Number of Neighbors')
plt.ylabel('Testing Accuracy')
\`\`\`

## Final Evaluation

\`\`\`python
KNN = KNeighborsClassifier(n_neighbors=5)
KNN.fit(x_train, y_train)
y_pred = KNN.predict(x_test)

#training Accuracy
train_accuracy = KNN.score(x_train, y_train)
print('train accuracy is', train_accuracy)

test_accuracy = KNN.score(x_test, y_test)
print('test accuracy is', test_accuracy)

from sklearn.metrics import accuracy_score
accuracy_score(y_test, y_pred)
\`\`\`

Using a higher number of neighbors, it can be seen that the accuracy on the test dataset increases slightly from 0.83 to 0.87.

Data cleaning is a very crucial step in both data analysis and data science and I hope this blog shared some insights on that. Do not forget to run the codes.🤗

Codes can be found on my GitHub.

Thank you for reading. Happy cleaning ❤️`,
    category: "Python",
    readTime: "15 min read",
    date: "November 7, 2020",
    featured: true,
  },
  {
    id: 4,
    slug: "getting-started-with-data-before-a-build-or-model",
    title: "Getting Started with Data Before a Build or Model",
    excerpt: "Understanding data is the first step of getting things done in terms of analytics or data science.",
    content: `Having fallen in love with the fact that data is powerful, very powerful I mean and enjoying the sessions I have with friends, I find myself writing this blog to essentially get anyone started with data, with little or no skills, one can invest into the journey of understanding data and making sense out of it.

## The Foundation

In my data cleaning to machine learning post, I talked about how one must understand the data and what makes up the data. This is the very first step of getting things done in terms of analytics or data science. Because very poor data may lead to poor results such as poor insights or model leading to poor decisions or outcomes.

## The Power of Data

Data is so powerful, it can change decisions and possible outcomes of these decisions. Therefore understanding and using it in the right way for the right insight is deemed very important.

Incomplete data or data that contains a lot of missing values can be problematic. So in the bid to understanding data, one must seek to make sure that the data is completed, that is to handle missing values, either by completely removing them or imputing them depending on the features in the data.

## Before the Build

Before the great build which leads to a good decision, one must identify the audience and ask relevant questions to get the views that make up the build. With this step, in-depth understanding is crucial.

### For Machine Learning
For a machine learning task to predict house prices, one must ask questions to find out which features in the data strongly correlate to these prices. It will then lead to further feature engineering or not.

### For Visualization
If building a dashboard based on a senior management level audience, questions asked would influence the builds in a view.

## The Truth About Data Complexity

Data can be put as being complex or not depending on time spent to understand and cleaning it. I'm a strong advocate for data cleaning because garbage in, results to garbage out, and that's not what we want.

Once the data has been understood, the result becomes a new story to tell. Let's build now!

Thank you for reading ❤️❤️. Data is the new world.`,
    category: "Insights",
    readTime: "5 min read",
    date: "January 31, 2021",
    featured: false,
    image: "/blog/data-getting-started.png",
  },
  {
    id: 5,
    slug: "cyclistic-bike-share-analysis",
    title: "How Does a Bike-Share Navigate Speedy Success?",
    excerpt: "Difference between a Cyclistic member and a regular user – Across the previous 12 months in Chicago.",
    content: `![Cyclistic Dashboard](/blog/cyclistic-dashboard.png)

## INTRODUCTION

The Cyclistic bike share analysis is a project based on a fictional company in Chicago. As an analyst, the goal of this project is to maximize the number of annual memberships which would lead to the growth of the company. In order to achieve this, the team wants to design a new marketing strategy to convert casual riders into annual members. The company launched in 2016 and has since then grown a fleet of 5,824 bicycles that are geotracked and locked into a network of 692 stations across Chicago. The bikes can be unlocked from one station and returned to any other station in the system anytime.

**Goal**: Converting casual riders into annual members of the bike-share product. In order to tackle this, these key steps would be followed:

- a. Ask
- b. Prepare
- c. Process
- d. Analyse
- e. Share
- f. Act

## ASK

**Business task**: Growth of the company by increasing the number of members through converting casual riders to annual members. Exploring how casual users use Cyclistic bikes differently from annual members.

**Key Stakeholders**: The Director of Marketing, The Manager, Marketing Analytics Team and the Executive Team.

## PREPARE

The data being used is the Divvy datasets which has been made available by Motivate International Inc. under this license (https://divvybikes.com/data-license-agreement). Cyclistic is a fictional company hence using this public data to explore the different types of riders and their behaviours. Riders' personally identifiable information has been removed from the data due to data privacy policies.

Viewing the data in spreadsheet for the first quick glance, it is seen that the datasets have 13 features namely; ride_id, rideable_type, started_at, ended_at, start_station_name, start_station_id, end_station_name, end_station_id, start_lat, start_lng, end_lat, end_lng and member_casual.

**Using Python for data cleaning**: The data being used is the previous 12 months of data that is from June 2020 to May 2021. This is to check for errors and duplicates in the data and also combining the individual csv files into a single data frame (GIANT CSV FILE😊). This can also be done in R by stacking the csvs on top of each other using the syntax rbind(). Note that, in Tableau, these individual csv files having the same columns can be combined as a union to form one table. Visualizations can also be done in Python and also R. In another blog post, I will explore those options. Since the data did not need colossal cleaning and manipulation, using Tableau to prepare insight and for sharing.

## PROCESS

For this process using Tableau for both visualizing and manipulating the data. In answering the objective, relevant questions were asked such as;

1. What is the average riding times for both users?
2. In which month records the highest number of rides for both users?
3. What happens on weekdays, in terms of number of rides taken by both users?
4. What times do we start both types of riders on the road?
5. What is the percentage of members to casual riders?

### Checking for duplicates in the dataset before visualizing:

\`\`\`
IF { FIXED [Ride_Id], [Started_At], [Ended_At], 
[start_station_name], [end_station_name]: (COUNT([Union]))}>1 THEN 'DUPLICATES'
ELSE 'ALL GOOD' END
\`\`\`

### Finding the number of trips or rides

\`\`\`
COUNT([Ride_Id])
\`\`\`

### Which percentage of this is for members. Finding ride ids that belong to just member users

\`\`\`
IF [Member_Casual] = 'member' THEN [Ride_Id] END
\`\`\`

### Number of trips taken by members

\`\`\`
COUNT([members_rid_id])
\`\`\`

### Percentage of rides taken by members

\`\`\`
[number_rides_by_members]/[number_of_trips]
\`\`\`

The same thing is done for casual rides, in the first calculated field, replace member with casual to filter out.

### Average riding time

The calculated field below gives the riding time.

\`\`\`
DATETIME([Ended_At] - [Started_At])
\`\`\`

In order to calculate for the average ride length; naming this field ride_length_copy

\`\`\`
[Ended_At] - [Started_At]
\`\`\`

Change the type of the calculated field above to custom data format using hh:mm:ss

\`\`\`
DATETIME(AVG([ride_length_copy]))
\`\`\`

### Extracting the month from the start time

\`\`\`
DATENAME('month', [Started_At])
\`\`\`

### Extracting the weekdays from the start time

\`\`\`
DATENAME('weekday', [Started_At])
\`\`\`

## ANALYSE

This is based on the questions asked in the Process Stage.

### What is the average riding times for both users?

For average ride length by each type of customer, filter out the type. For example for casual rides, drag the member_casual to the filter pane and choose casual.

**TOTAL**

![Average Ride Time Total](/blog/cyclistic-avg-total.png)

**MEMBER**

![Average Ride Time Member](/blog/cyclistic-avg-member.png)

**CASUAL**

![Average Ride Time Casual](/blog/cyclistic-avg-casual.png)

### In which month records the highest number of rides for both users?

Using the months and number of trips. Remember the data is from June 2020 to May 2021.

**TOTAL**

![Monthly Rides Total](/blog/cyclistic-monthly-total.png)

**MEMBER**

![Monthly Rides Member](/blog/cyclistic-monthly-member.png)

**CASUAL**

![Monthly Rides Casual](/blog/cyclistic-monthly-casual.png)

The peak of bike rides are around the summer months with August recording the highest bike rides of 622,361. 332,700 from members and 289,661 for casual riders.

### What happens on weekdays, in terms of number of rides taken by both users?

**TOTAL**

![Weekday Rides Total](/blog/cyclistic-weekday-total.png)

**MEMBER**

![Weekday Rides Member](/blog/cyclistic-weekday-member.png)

**CASUAL**

![Weekday Rides Casual](/blog/cyclistic-weekday-casual.png)

The line represents the trend of trips taken from Sunday to Saturday.

Saturday recorded the highest number of bike rides in the weekdays. Saturdays is the weekend and people might take bike rides for leisure. It can be seen that as the week progresses into the weekend the number of rides grows. that's from Monday to Saturday.

Casual users tend to use take more bike rides as compared to members on the weekends and less on the weekdays.

Can it be said that, some members may be using the bikes as commute to work?

### What is the percentage of members to casual riders?

**TOTAL**

![Total Rides](/blog/cyclistic-total-rides.png)

**MEMBER**

![Percent Member](/blog/cyclistic-percent-member.png)

**CASUAL**

![Percent Casual](/blog/cyclistic-percent-casual.png)

### What times do we start both types of rides on the road?

Members ride as early as 05:59:59 am as compared to casual riders who can start at 06:00:46am. Showing the table breakdowns below for months and days:

![Start Time by Day](/blog/cyclistic-starttime-day.png)

![Start Time by Day Breakdown](/blog/cyclistic-starttime-day-breakdown.png)

![Start Time by Month](/blog/cyclistic-starttime-month.png)

![Start Time by Month Breakdown](/blog/cyclistic-starttime-month-breakdown.png)

Most of the months have rides starting as early as after midnight. Some people do appreciate midnight ride tour of the city after all.

## SHARE

In this step, visualizing the findings as seen in the Analyse progress and bring them all together.

Decided to make a fun visualization to project the findings of the analysis. The heatmap in the dashboard shows the number of trips completed in the days of each month. That is from Sunday to Saturday. Currently showing the total for both user types for the line chart and the heatmap. Once the parameter is changed to either of the user type, this visualization would have to represent the user type.

**Saturdays in August recorded the highest number of rides for both users.**

**TOTAL**

![Heatmap Total](/blog/cyclistic-heatmap-total.png)

**MEMBER**

![Heatmap Member](/blog/cyclistic-heatmap-member.png)

**CASUAL**

![Heatmap Casual](/blog/cyclistic-heatmap-casual.png)

## ACT

### Conclusion

In this step, recommendations are provided based on the findings from the Analyse stage.

**Weekends are for leisures.** It is seen that casual riders tend to ride more on the weekend. In this situation, providing promotions or discounts to engage these users to subscribe or become members to take advantage of the discounts or promotions.

**Summer is for vacation**, visiting family, unwinding from work and having great time. During the summer to maximize and engage both types of users, members should be giving a boost to ride more by providing some incentives as motivation and casuals also giving some packages to enable them subscribe and enjoy more of the services offered by Cyclistic.

**Rides are for exercising and clearing the mind.** User Statistics could be a way to capture both casual users and members. The start time from the analyze shows early risers from working out or for unwinding. Providing an app to show users their ride statistics encompassing the health benefits and calories burnt would be a good way to engage both users.

This Project is based on the Google Data Analytics Professional Certificate.`,
    category: "Tableau",
    readTime: "15 min read",
    date: "June 15, 2021",
    featured: true,
    image: "/blog/cyclistic-dashboard.png",
  },
  {
    id: 6,
    slug: "python-publish-csv-to-tableau-server",
    title: "How To Use Python To Publish Data From A CSV To Tableau Server",
    excerpt:
      "Learn how to automate publishing CSV data as Hyper extracts to Tableau Server using Python and the Tableau APIs.",
    content: `![CSV Python Tableau](/blog/csv-python-tableau.png)

Over the past year, I have learned a lot and I am extremely excited to share some of the cool things with you. As the world keeps evolving at a fast pace, it has led to automation. In my daily work, it is a key priority to automate some aspects of work to make life easy for everyone. Who doesn't love to do the hard lifting and enjoy its fruits? 😅

With this said. I had a long discussion with my friend and mentor some months ago, a big shout-out to Lawer Akrofi. To be exact two years ago. I know!!! it has taken me two years to put this together. But then it is good news because I tried re-implementing this solution we came up with and realized I had some restrictions on the server hence an API to the server to insert data was not a solution for me. So what did I do? I had a script that fetched daily CSV files onto my machine with the help of cronjobs and Tableau Prep flow which cleans the data and publishes it to the server using the prep command line. oh yes, it was a fun time for me to learn and once I figured it out, I did reward myself with a very good piece of tiramisù. If you do know me, well I have a sweet tooth. 😊

I have said a lot of things but no codes yet. Let's dive into publishing a static CSV file as hyper on the Tableau server using the Tableau Server's API. In another blog post, we will do a little rewiring when we talk about using SharePoint instead of a CSV file that sits on your laptop. In case your firm has its own database and API, an API call to fetch data, is indeed possible. Everything under the sun is possible to achieve!!!!

To every data enthusiast out there using python, is it safe to say pandas is our best friend and first love of data manipulation? Below, I will insert the block of codes and try my very best to explain. I came across a blog post that was extremely helpful for the creation of the hyper extract. I modified it to prevent typing in 100 column names if your data is large while creating the schema and also allows users to specify which project to publish the data to.

\`\`\`python
#importing all needed libarires
import pandas as pd

from tableau_api_lib import TableauServerConnection
from tableau_api_lib.utils.querying import get_projects_dataframe

from tableauhyperapi import HyperProcess, Connection, TableDefinition, SqlType, Telemetry, Inserter, CreateMode, TableName
from tableauhyperapi import escape_string_literal

import tableauserverclient as TSC

#Get the data; read in csv file
filename = pd.read_csv(['file name goes here'], usecols = ['read in appropriate columns needed'])


#convert all datetime values to appropriate type
#convert data types into their appropriate types and formats
#an example below to convert date
filename['date'] = filename['date'].apply(pd.to_datetime)



# get a list of column names from the csv file
colnames = filename.columns

# get a list of column types from the csv file
coltypes = filename.dtypes

#the above would help with the definition of the schema

#specifying the various data type to be used to define the schema 
field = { 
    'float64' :     SqlType.double(), 
    'float32' :     SqlType.double(),
    'int64' :       SqlType.double(),
    'int32' :       SqlType.double(),
    'object':       SqlType.text(),
    'bool':         SqlType.bool(),
    'datetime64[ns, UTC]':   SqlType.date(),
}


# for each column, add the appropriate info for the Table Definition
column_names = []
column_type = []
for i in range(0, len(colnames)):
    cname = colnames[i] #header of column
    coltype = coltypes[i] #pandas data type of column
    ctype = field.get(str(coltype)) #get corresponding sql column type 

    #store in lists to used for column and schema
    column_names.append(cname)
    column_type.append(ctype)


#name and path to save extract temporarily
PATH_TO_HYPER = 'hyper_extract.hyper'

# Step 1: Start a new private local Hyper instance
with HyperProcess(Telemetry.SEND_USAGE_DATA_TO_TABLEAU, 'myapp' ) as hyper:

# Step 2:  Create the the .hyper file, replace it if it already exists
    with Connection(endpoint=hyper.endpoint, 
                    create_mode=CreateMode.CREATE_AND_REPLACE,
                    database=PATH_TO_HYPER) as connection:

# Step 3: Create the schema(empty)
        connection.catalog.create_schema('Extract')


# Step 4: Create the table definition
        #defining the columns according to the dataframe
        cols = []
        for i, j in zip(column_names, column_type):
            columns = TableDefinition.Column(i, j)
            cols.append(columns)


        #creating schema 
        schema = TableDefinition(table_name=TableName('Extract','Extract'),
                columns= cols)

# Step 5: Create the table in the connection catalog
        connection.catalog.create_table(schema)
    
        with Inserter(connection, schema) as inserter:
            for index, row in filename.iterrows():
                inserter.add_row(row)
            inserter.execute()

    print("The connection to the Hyper file is closed.")     


# Establish a connection to Tableau Server and publish the extract
tableau_auth = TSC.PersonalAccessTokenAuth('name of API goes here', 'your token secret goes here')
server = TSC.Server('site address')

# For Tableau Online instead, use:
# tableau_auth = TSC.PersonalAccessTokenAuth('name of API', 'token secret', 'site name')
# server = TSC.Server('site address')


#allow user to input project name for datasource to be published
datasource = input(str('enter name of datasource project directory to publish datasource '))


with server.auth.sign_in(tableau_auth):

     # fetch the corresponding project id 
    ID = ''

    all_project_items, pagination_item = server.projects.get()
    for proj in all_project_items:
        if proj.name == datasource:
            ID = proj.id

    # Use the project id to create new datsource_item
    new_datasource = TSC.DatasourceItem(ID)

    # publish data source (specified in file_path)
    new_datasource = server.datasources.publish(
                    new_datasource, PATH_TO_HYPER, 'CreateNew')
        
    # since datasource exist from prior publish, overwrite it 
    # new_datasource = server.datasources.publish(
    #                 new_datasource, PATH_TO_HYPER, 'Overwrite')

#signing out of the tableau server
print('Publishing completed')
server.auth.sign_out()
\`\`\`

That is all folks!! This is pretty straightforward. In order to run this periodically, saving these codes as .py file and using cronjobs on MAC or task scheduler on WINDOWS, I believe a good job on automation could be done. Having this periodically on the server and feeding it into a dashboard for reporting is pretty much hard lifting work. Sit back and enjoy the beauty of technology and evolution. I hope the above comments in the codes make a good explanation. 😊

## Resources

- **Tableau Hyper API**: https://tableau.github.io/hyper-db/docs/
- **Tableau REST API**: https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api.htm`,
    category: "Python",
    readTime: "7 min read",
    date: "February 18, 2022",
    featured: false,
    image: "/blog/csv-python-tableau.png",
  },
  {
    id: 7,
    slug: "sql-murder-mystery",
    title: "SQL Murder Mystery",
    excerpt: "Solving the SQL Murder Mystery using Common Table Expressions (CTEs) to find the murderer and the mastermind.",
    content: `![SQL Murder Mystery](/blog/sql-murder-mystery-header.png)

*Image from The SQL Murder Mystery Website*

In my current role, I do not use SQL at all. I have always loved SQL. It is quite the language and I was very happy when @jessica_xls shared the link to The SQL Murder Mystery. I decided to relive my SQL days and what better way to do it than to solve a MYSTERY!! It was also a great way to use Common Table Expressions(CTE) – this would be found below.

Shall we dive into it? I promise I would make it fun.

The website makes it interesting to solve the case. Before we start getting the name of the murderer, The website gives this cool feature of running 2 queries to know the names of the tables in the database and the data structure of the crime_scene_report table (of course we do need that in order to solve this case as our detective instincts grow). Note: The SQL Murder Mystery is built using SQLite.

![Database Tables](/blog/sql-mystery-tables.png)

![Table Structure](/blog/sql-mystery-structure.png)

Great Job! Now let's bust some criminals.

## Step 1: Let's take a look at the Crime Report

The only information we have is that the crime was murder, which took place in SQL City on Jan 15 2018.

\`\`\`sql
Select *
From crime_scene_report
Where date = '20180115' 
And city = 'SQL City'
And type = 'murder'
\`\`\`

![Crime Scene Report](/blog/sql-mystery-crime-report.png)

Good news! We have just one murder case on Jan 15 2018. It narrows down our work, doesn't it?

What is next you may ask?

## Step 2: Getting the transcripts of the witnesses

Let's get the transcript of the first witness. Assuming the houses are arranged in ascending order, let's get the last house on Northwestern Dr address.

\`\`\`sql
Select *
From person
Join interview on id = interview.person_id
Where address_street_name = 'Northwestern Dr'
Order by 4 desc
Limit 1
\`\`\`

![Morty Schapiro ID](/blog/sql-mystery-witness1-id.png)

![Morty Schapiro Transcript](/blog/sql-mystery-witness1.png)

Our first witness Morty Schapiro definitely heard a gunshot being fired that day. Also what a perfect description to get of the suspect.

Can we check in on our second witness Annabel of Franklin Ave?

\`\`\`sql
Select *
From person
Join interview on id = interview.person_id
Where name like '%Annabel%'
And address_street_name = 'Franklin Ave'
\`\`\`

![Annabel Miller ID](/blog/sql-mystery-witness2-id.png)

![Annabel Miller Transcript](/blog/sql-mystery-witness2.png)

Annabel Miller also did confirm that there was a murder. With Morty's description, we have some good leads on the case.

## Step 3: Let's find the murderer

Using the person table and the drivers_license table:

\`\`\`sql
Select name
From (
Select *
From get_fit_now_member
Join person on person_id = person.id
Where get_fit_now_member.id like '48Z%'
) as results 
Join drivers_license on results.license_id = drivers_license.id
Where plate_number like '%H42W%'
\`\`\`

The murderer was **Jeremy Bowers** but is he the mastermind behind this crime? Let's find out by checking his transcript.

\`\`\`sql
Select transcript
From interview
Join person on interview.person_id = person.id
Where person.name = 'Jeremy Bowers'
\`\`\`

![Jeremy Bowers Transcript](/blog/sql-mystery-transcript.png)

We are getting warmer. Let's find the Real Villain, the Mastermind of this mystery.

\`\`\`sql
Select name
From(
Select *, count(*) as number_of_attendance
From person
Join facebook_event_checkin on person.id = facebook_event_checkin.person_id
Where event_name = 'SQL Symphony Concert'
And date like '201712%' group by name
) as results
Join drivers_license on results.license_id = drivers_license.id
Where number_of_attendance = 3 
And 65 <= height <= 67
And gender = 'female'
And hair_color = 'red'
And car_make = 'Tesla' 
And car_model = 'Model S'
\`\`\`

**Miranda Priestly** is the brains behind this murder!

![Final Solution](/blog/sql-mystery-solution.png)

Great work. We solve the murder mystery in SQL City. Now let's look at some Common Table Expressions(CTE)

## Finding the murderer with CTE

\`\`\`sql
With 

suspect as (
Select *
From get_fit_now_member
Join person on person_id = person.id
Where get_fit_now_member.id like '48Z%'), 

the_suspect as (
Select *
From suspect
Join drivers_license on license_id = drivers_license.id
Where plate_number like '%H42W%') 

Select transcript
From interview
Join the_suspect on interview.person_id = the_suspect.person_id;
\`\`\`

## Finding the mastermind with CTE

\`\`\`sql
With 

short_list as (
Select *
From facebook_event_checkin
Where event_name = 'SQL Symphony Concert'
And date like '201712%'), 

persons_shortlist as (
Select *
From person
Join short_list on id = person_id), 

event_info as (
Select *, count(*) as num_attedance
From persons_shortlist join drivers_license on license_id = drivers_license.id 
Group by name) 

Select name
From event_info
Where 65<= height <= 67
And hair_color = 'red'
And gender = 'female'
And num_attedance = 3
And car_make = 'Tesla'
And car_model = 'Model S'
\`\`\`

If you enjoyed this, do check out [The SQL Murder Mystery](https://mystery.knightlab.com/) and do give [@jessica_xls](https://twitter.com/jessica_xls?s=21&t=iNqaPY0mlq63VBKVF_Bi8Q) a follow (She is AWESOME)`,
    category: "SQL",
    readTime: "8 min read",
    date: "Oct 15, 2022",
    featured: false,
    image: "/blog/sql-murder-mystery-header.png",
  },
  {
    id: 8,
    slug: "building-cool-things-learning-to-prototype-with-figma",
    title: "Building Cool Things: Learning How to Prototype (Mock up) with Figma",
    excerpt:
      "Learning how to use Figma for dashboard prototyping and mock-ups. A pretty amazing level-up on using this AWESOME tool.",
    content: `I have used Figma a lot of times for both static wireframes and dashboard backgrounds. This is a pretty amazing level-up on using this AWESOME tool. The purpose of learning this level is to make sure that as a whole I appreciate the capability of the tool and also to build up my skill set. You can never know too much.

One of the beauties of being part of the DataFam Community is you always learn and incorporate tips and tools from the community as you grow. I came across this Tutorial Session by [Autumn Battani](https://public.tableau.com/app/profile/autumnbattani/vizzes) and I just wanted to learn and also share my understanding of it.

First and foremost, let me acknowledge how awesome She is. She took her time to really explain and put together an interactive mock-up in Figma. You can find her videos here.

In the below file, I went through the tutorial videos and created the different pages. Feel free to [duplicate the file](https://www.figma.com/design/WRXOY3j7uwV8LVJjgkx6HO/Learning?node-id=0-1&p=f) and use it as needed.

Would this be a series? Most likely!!!!!! In the coming weeks I would go deeper in learning how to build more complicated dashboards and learn more on how to do the absolutely most with this UX/UI tool. As I said, It is pretty AWESOME.

## Basic Charts

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FWRXOY3j7uwV8LVJjgkx6HO%2FLearning%3Fpage-id%3D0%253A1%26node-id%3D72%253A34%26viewport%3D398%252C467%252C0.21%26scaling%3Dcontain" allowfullscreen></iframe>

## Building a Complete Dashboard

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FWRXOY3j7uwV8LVJjgkx6HO%2FLearning%3Fpage-id%3D1%253A241%26node-id%3D72%253A35%26viewport%3D862%252C750%252C0.92%26scaling%3Dcontain" allowfullscreen></iframe>

## Interactivity and Mock up

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FWRXOY3j7uwV8LVJjgkx6HO%2FLearning%3Fpage-id%3D1%253A496%26node-id%3D72%253A36%26viewport%3D34%252C522%252C0.53%26scaling%3Dcontain" allowfullscreen></iframe>

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FWRXOY3j7uwV8LVJjgkx6HO%2FLearning%3Fpage-id%3D121%253A776%26node-id%3D121%253A1037%26viewport%3D664%252C438%252C0.53%26scaling%3Dcontain%26starting-point-node-id%3D121%253A1037" allowfullscreen></iframe>`,
    category: "Design",
    readTime: "4 min read",
    date: "September 26, 2022",
    featured: false,
  },
  {
    id: 9,
    slug: "making-music-cool-get-lyrics-from-spotify",
    title: "Making Music Cool; Get Lyrics From Spotify Music",
    excerpt: "Using the Spotify API and Genius API to retrieve lyrics of the song currently playing.",
    content: `![Headphones](/blog/spotify-lyrics-headphones.png)
*(image from Unsplash)*

I love music. Growing up I was introduced to different genres at a pretty young age. My dad's love for jazz and my brother's hip-hop nature. I appreciate and love all genres of music. Most importantly, I love the words that compose a song. Words are big for me in music. With my love for H.E.R, J Cole and Kendrick Lamar based on their choices of words in their art.

Apple Music has a pretty cool feature of getting the lyrics of the song while playing. In my bid to wanting to enjoy something like that from Spotify, I found myself looking at APIs that can help me achieve this task. An easy task when using the Spotify API to retrieve the song playing and the genius API to get the lyrics of the song (Thanks to my cool Data Scientist Friend who put me to the task of grabbing lyrics of some songs from genius for a pretty cool project- watch out for his project, he is AWESOME). You can find his profile here.

I know at this point, you are tired of reading. Let's get to the cool stuff.

## Setting Up Spotify API

In order to get started, we need to sign up to use the Spotify API. you can do so here and create an app. After doing so, let's get the client id and secret code. Also, add a direct URL 'http://localhost:8888/callback/' to your created app.

**Spotify API credentials:**

\`\`\`python
#getting my spotify credentials 
USERNAME = 'Your username'
SPOTIPY_CLIENT_ID = 'client id'
SPOTIPY_CLIENT_SECRET = 'client secret code'
SPOTIPY_REDIRECT_URI = 'http://localhost:8888/callback/'
\`\`\`

Do not forget to install the Spotipy by using the 'pip install command':

\`\`\`bash
pip install spotipy
\`\`\`

## Retrieving Current Song

Let's retrieve the song name and artist name of the music we are listening to on Spotify.

\`\`\`python
import spotipy
import spotipy.util as util

from config import USERNAME, SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET, SPOTIPY_REDIRECT_URI, access_token
import lyricsgenius 

#this is to tell spotify what you are doing with the script.
#'https://developer.spotify.com/documentation/general/guides/scopes/'
scope = 'user-read-currently-playing'

# providing credentials 
token = util.prompt_for_user_token(
    USERNAME, scope, client_id=SPOTIPY_CLIENT_ID, client_secret=SPOTIPY_CLIENT_SECRET, redirect_uri=SPOTIPY_REDIRECT_URI)


if token:
    # intialize with the token to gain access 
    sp = spotipy.Spotify(auth=token)
    # retrive name of song playing on spotify now 
    current_song = sp.currently_playing()
    # Extract artist
    artist = current_song['item']['artists'][0]['name']
    # Extract song name 
    song_name = current_song['item']['name']

    #print out the extracted items 
    print('\\nSong: {}\\nArtist: {}'.format(song_name, artist))
\`\`\`

## Setting Up Genius API

We are then going to feed this information into the Genius API but first let's setup the environment.

With this available API, the task of getting song lyrics by an artist has rather been simplified. To get the ball rolling, first you have to sign up for the Genius API on here. Once that is done, install the model by running the line below in your terminal. This is the python client for the Genius API.

\`\`\`bash
pip install lyricsgenius
\`\`\`

Generate your access token after signing up. We need it for our codes to work! Do not forget that. Now, save your access token.

\`\`\`python
access_token = 'Your Copied Token Goes Here'
\`\`\`

## Getting the Lyrics

Let's get the lyrics now!!!!! shall we!

\`\`\`python
# using the genius api to get the lyrics 
#getting the lyrics of songs by the artist 
genius = lyricsgenius.Genius(access_token)
song = genius.search_song(song_name, artist)
songlyrics = song.lyrics
print(songlyrics)
\`\`\`

## Full Code

Let's see the full codes, save and run in our terminal.

\`\`\`python
import spotipy
import spotipy.util as util

from config import USERNAME, SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET, SPOTIPY_REDIRECT_URI, access_token
import lyricsgenius 

scope = 'user-read-currently-playing'

# To connect succesfully you need to provide your own Spotify Credentials
# You can do this signing up in https://developer.spotify.com/ and creating a new app.
token = util.prompt_for_user_token(
    USERNAME, scope, client_id=SPOTIPY_CLIENT_ID, client_secret=SPOTIPY_CLIENT_SECRET, redirect_uri=SPOTIPY_REDIRECT_URI)

if token:
    # Create a Spotify() instance with our token
    sp = spotipy.Spotify(auth=token)
    # method currently playing return an actual song on Spotify
    current_song = sp.currently_playing()
    # Extract artist from json response
    artist = current_song['item']['artists'][0]['name']
    # Extract song name from json response
    song_name = current_song['item']['name']

    print('\\nSong: {}\\nArtist: {}'.format(song_name, artist))

    # using the genius api to get the lyrics 
    #getting the lyrics of songs by the artist 
    genius = lyricsgenius.Genius(access_token)
    song = genius.search_song(song_name, artist)
    songlyrics = song.lyrics
    print(songlyrics)

else:
    print("token can not be found for", username)
\`\`\`

That's it guys. Thank you for checking this out. Enjoy music, it is the food for the soul❤️.`,
    category: "Python",
    readTime: "5 min read",
    date: "December 1, 2020",
    featured: false,
    image: "/blog/spotify-lyrics-headphones.png",
  },
];

export const categories = ["All", "Tableau", "Python", "SQL", "Design", "Insights"];

export const categoryColors: Record<string, string> = {
  Tableau: "bg-coral/10 text-coral",
  Python: "bg-mint/20 text-accent-foreground",
  SQL: "bg-lavender/30 text-coral",
  Design: "bg-peach/20 text-foreground",
  Insights: "bg-soft-pink/20 text-foreground",
};
