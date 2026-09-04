import {
  BarChart2,
  Code,
  Map,
  Music,
  Tv,
  ShoppingCart,
  Vote,
  Users,
  Bike,
  Gamepad2,
  BookOpen,
  Building2,
  Heart,
  Calendar,
  Shirt,
  Clapperboard,
  Activity,
  LucideIcon,
} from "lucide-react";

// Import portfolio images
import genderInequalityImg from "@/assets/portfolio/gender-inequality-parliament.png";
import electionsImg from "@/assets/portfolio/trend-elections-ghana.png";
import musicPlaysImg from "@/assets/portfolio/music-plays-2023.png";
import accraMapImg from "@/assets/portfolio/accra-map-layers.png";
import rugratsImg from "@/assets/portfolio/rugrats-viz.png";
import boondocksImg from "@/assets/portfolio/boondocks-viz.png";
import salesOverviewImg from "@/assets/portfolio/sales-overview.png";
import ghanaianDayNamesImg from "@/assets/portfolio/ghanaian-day-names.png";
import cyclisticRidesImg from "@/assets/portfolio/cyclistic-rides.png";
import willSmithImg from "@/assets/portfolio/will-smith-filmography.png";
import streetNamesAccraImg from "@/assets/portfolio/street-names-accra.png";
import injustice2Img from "@/assets/portfolio/injustice-2.png";
import ghana2016ElectionsImg from "@/assets/portfolio/ghana-2016-elections.png";
import africanWritersBooksImg from "@/assets/portfolio/african-writers-books.png";
import hrDashboardImg from "@/assets/portfolio/hr-dashboard.png";
import bobMarleyTributeImg from "@/assets/portfolio/bob-marley-tribute.png";
import inukkiImg from "@/assets/portfolio/inukki-app.png";
import brickdexImg from "@/assets/portfolio/brickdex-app.png";
import reelfeelImg from "@/assets/portfolio/reelfeel-app.png";
import thyveImg from "@/assets/portfolio/thyve-app.png";

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  category: string | string[];
  image: string;
  externalLink: string;
  icon: LucideIcon;
  tools: string[];
  year: string;
  collaborators?: string;
  pdfUrl?: string;
  codeSnippet?: string;
  customCaseStudy?: boolean;
  /**
   * Archive switch. `true` keeps the project in the codebase — its data, its
   * case study, its route — but pulls it out of every listing (portfolio grid,
   * filters, featured). Direct links to /portfolio/<slug> still resolve.
   * Flip back to `false` (or delete the line) to bring it out of the archive.
   */
  hidden?: boolean;
  /** Overrides the label on the project's call-to-action button. */
  ctaLabel?: string;
  /**
   * Optional second call-to-action, rendered as an outline button beside the
   * primary one. Use for a TestFlight build sitting alongside a public listing.
   */
  secondaryLink?: { url: string; label: string };
}

// Helper to get display categories (always returns array)
export const getCategories = (category: string | string[]): string[] => {
  return Array.isArray(category) ? category : [category];
};

const unsortedProjects: Project[] = [
  {
    id: 1,
    slug: "gender-inequality-parliament",
    title: "Gender Inequality in Ghana's Parliament",
    description:
      "Interactive infographic analyzing gender representation across parliamentary sessions, regional distribution, and party representation from 1960-2020.",
    fullDescription: `This visualization explores the journey of female representation in Ghana's Parliament since independence. The female voice has yet to be fully heard in Ghana's parliament since independence. In 1960, Mabel Dove Danquah, a journalist, became the first female elected to parliament when she won the Ga Rural seat.

The infographic analyzes:
Historical Timeline: Tracking the number of women MPs from the 1st Parliament to the 7th Parliament (2016), showing a gradual increase from 7 women (out of 129 members) in 1979 to 36 women (out of 275 members) in 2016.
Regional Representation: Breaking down female representatives across all 16 regions of Ghana, with Greater Accra leading in female representation.
Party Representation: Examining how the NDC and NPP, Ghana's dominant parties, compare in terms of female candidates elected.
The Need for Women in Power: Highlighting the importance of gender equality in political decision-making.

A collaboration between Lowar Akrofi and Maureen Dzifa Quist.`,
    category: "Tableau",
    image: genderInequalityImg,
    externalLink:
      "https://public.tableau.com/views/InequalityinGhanasParliament_15997884283440/InequalityinGhanasParliament2?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    icon: Users,
    tools: ["Tableau", "Data Research", "Infographic Design"],
    year: "2020",
    collaborators: "Lawer Akrofi",
  },
  {
    id: 2,
    slug: "trend-of-elections-ghana",
    title: "Trend of Elections in Ghana",
    description:
      "Comprehensive visualization of Ghana's electoral history, examining voting patterns, regional preferences, and macroeconomic factors affecting election results.",
    fullDescription: `Since the first presidential election in 1992 following the country's transition to multi-party democracy, Ghana has held seven presidential elections with the two major parties—NDC and NPP—alternating power.

This visualization explores:
- Vote Trends: Tracking the total votes received by NDC and NPP from 1992 to 2016, showing how electoral support has shifted over time.
- Regional Analysis: An interactive map showing which party won in each region and year, revealing regional voting patterns and strongholds.
- Macroeconomic Factors: Examining whether GDP per capita, inflation rates, and unemployment rates correlate with election outcomes.
- Predictive Analysis: Using historical data to explore whether economic factors can predict future election results.

The data reveals interesting patterns about how Ghanaians vote and what factors influence their decisions at the polls.`,
    category: "Tableau",
    image: electionsImg,
    externalLink:
      "https://public.tableau.com/views/TrendofElections/TrendofElections?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    icon: Vote,
    tools: ["Tableau", "Data Analysis", "Geographic Mapping"],
    year: "2020",
  },
  {
    id: 3,
    slug: "music-plays-2023",
    title: "Know Me By My 2023 Music Plays",
    description:
      "Personal data visualization of Apple Music listening habits - 27,215 minutes of music analyzed by top songs, monthly patterns, and listening trends.",
    fullDescription: `They often say music is food for the soul, and I find great pleasure in immersing myself in its beautiful melodies. This year, I listened to about 27,215 minutes of music, savoring various genres.

This personal data visualization explores:
- Top 15 Songs Played: Featuring "All Over" by Magixx as the #1 most played song with 157 plays (433.7 minutes), followed by "Xtra Cool" by Young Jonn and "Sinner" by Adekunle Gold & Lucky Daye.
- Top 100 Plays by Month: A radial visualization showing the distribution of top songs across all 12 months, with peaks during February, March, April, May, and July corresponding to road trips and international travels.
- Monthly Listening Patterns: A bar chart showing total minutes listened each month, with March (3,294 minutes) being the highest.

This visualization tells the story of my year through the music I listened to—revealing travel periods, mood patterns, and musical preferences.`,
    category: ["Data Viz 4 Fun", "Tableau"],
    image: musicPlaysImg,
    externalLink:
      "https://public.tableau.com/views/MyMusicPlays2023/MYMUSICPLAYS?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    icon: Music,
    tools: ["Tableau", "Apple Music Data", "Personal Analytics"],
    year: "2023",
  },
  {
    id: 4,
    slug: "places-accra-map",
    title: "Places I Have Been To in Accra",
    description:
      "Interactive map using parameter actions and map layers in Tableau, showcasing locations visited across Greater Accra with toggle-able categories.",
    fullDescription: `This project demonstrates the use of map layers and parameters in Tableau. Parameter actions give end-users of a dashboard more control in terms of interactivity, while map layers allow adding multiple layers of geographic data to a map.

Key features include:
- Interactive Layer Controls: Toggle on/off different location categories including Desserts, Malls, Recreational Centers, Restaurants & Bars, Beaches, Salons, Cafés, Supermarkets, and Roads.
- Geographic Data Sources: Using shapefiles from data.gov.gh for Greater Accra roads and Google Maps coordinates for personal location history.
- Technical Implementation: Combining QGIS for location selection by radius with Tableau for visualization.

This visualization serves as practice for mastering Tableau's advanced mapping capabilities while creating a personal geography of experiences in Accra.`,
    category: "Tableau",
    image: accraMapImg,
    externalLink:
      "https://public.tableau.com/views/ParametersXMapLayers/PARAMETERSXLAYERS?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    icon: Map,
    tools: ["Tableau", "QGIS"],
    year: "2022",
  },
  {
    id: 5,
    slug: "rugrats-analysis",
    title: "Rugrats: Animated Series Analysis",
    description:
      "Creative data visualization exploring the Rugrats animated series (1991-2001) - season ratings, character timelines, and episode premier history.",
    fullDescription: `Rugrats reveals the world from a baby's point of view. Everything looks bigger, more mysterious and uncontrollable. Angelica, the oldest, likes to terrorize her cousin, Tommy, and his friends, and is famous for screaming, "You stupid babies!" The adults in the series are often clueless.

This visualization explores:
- Season Ratings: Average ratings for all 9 seasons, with Season 2 achieving the highest average rating of 7.532 and Season 1 at 7.160.
- Character Profiles: Introducing the main characters including Tommy Pickles (main protagonist), Chuckie Finster (Tommy's best friend), Angelica Pickles (main antagonist), Reptar (fictional dinosaur), and Spike (family pet).
- Timeline: Tracking when each season premiered from 1991 to 2002, showing the show's evolution over more than a decade.
- Number of Votes: Visualizing audience engagement across all 9 seasons.

Data sourced from Wikipedia, IMDb, Fandom, and Pinterest with sound from Redringtones.`,
    category: ["Data Viz 4 Fun", "Tableau"],
    image: rugratsImg,
    externalLink:
      "https://public.tableau.com/views/Rugrats/Rugrats?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    icon: Tv,
    tools: ["Tableau", "IMDb Data", "Creative Design"],
    year: "2022",
  },
  {
    id: 6,
    slug: "boondocks-analysis",
    title: "The Boondocks: Series Deep Dive",
    description:
      "Visual analysis of The Boondocks animated series featuring character breakdowns, episode ratings per season, and series timeline from 2005-2014.",
    fullDescription: `Cantankerous Robert "Granddad" Freeman is the legal guardian of his grandsons, 10-year-old revolutionary Huey and 8-year-old Riley, a product of contemporary rap culture. After moving the family from Chicago's South Side to the safety of suburban Woodcrest—aka the boondocks—Granddad hopes to ignore the grandkids and enjoy his golden years in peace.

This visualization explores:
- Series Overview: 4 seasons, 55 episodes, first aired November 6, 2005, last aired June 23, 2014.
- Character Classification: Main characters (Huey, Robert, Riley Freeman), secondary characters (Thomas Lancaster DuBois, Sarah DuBois, Jazmine DuBois), other major characters (Uncle Ruckus, Ed Wuncler Jr., and more), and recurring characters.
- Rating per Episode: Bar chart visualizations showing episode ratings across all 4 seasons, featuring character illustrations of Riley and Robert.
- Votes per Season: Circular visualization showing audience engagement trends.

Data sourced from IMDb and Wikipedia, with icons from The Noun Project and audio from YouTube.`,
    category: ["Data Viz 4 Fun", "Tableau"],
    image: boondocksImg,
    externalLink:
      "https://public.tableau.com/views/TheBoondocks/THEBOONDOCKS?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    icon: Tv,
    tools: ["Tableau", "IMDb Data", "Creative Design", "Audio Integration"],
    year: "2022",
  },
  {
    id: 7,
    slug: "sales-overview-dashboard",
    title: "Sales Overview Dashboard",
    description:
      "Executive sales dashboard with KPI tracking, regional breakdowns, sales trends, and category analysis for business intelligence reporting.",
    fullDescription: `A comprehensive executive dashboard designed for tracking sales performance across multiple dimensions. This dashboard demonstrates proficiency in creating business intelligence solutions that enable data-driven decision making.

Key features include:
- KPI Cards: Total Sales ($13,794), Total Profit ($1,030), Total Quantity (256), and Profit Percentage (7.47%) for the selected region.
- Regional Filtering: Filter views by different regions (Central, East, West, South) with a date selector for temporal analysis.
- Breakdown by State: Ranked list showing sales performance by state, from Michigan ($2,903) to Oklahoma ($11).
- Sales Trend Analysis: Time series visualization showing sales patterns from 2015-2019 with notable peaks and valleys.
- Top Sellers: Identifying best-performing products including Phones ($2,832), Chairs ($2,424), and Appliances ($2,382).
- Category Breakdown: Sparklines showing sales trends for Furniture, Office Supplies, and Technology segments.
- Export Options: PDF and image export functionality for reporting.`,
    category: "Tableau",
    image: salesOverviewImg,
    externalLink:
      "https://public.tableau.com/views/SalesOverview_16081326841510/salesoverview?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    icon: ShoppingCart,
    tools: ["Tableau", "Business Intelligence", "KPI Design"],
    year: "2023",
  },
  {
    id: 8,
    slug: "consumer-purchase-journey",
    title: "Consumer Purchase Journey Analysis",
    description:
      "Market research project analyzing consumer buying behavior for smart home products using qualitative research methods and customer insights frameworks.",
    fullDescription: `This market research project analyzes the consumer buying journey to understand decision-making processes for smart home products, specifically focusing on robot vacuum cleaners.

Research Objectives:
- Analyze the consumer buying journey to better understand their decision-making process
- Assess customer satisfaction with the product and likelihood of repeat purchases
- Determine whether customers would recommend the products to others
- Explore the relationship model between the company and the customer
- Identify complementary quantitative research opportunities

Case Study: Meet Brittany
A business owner and mother of two who purchased a robot vacuum for convenience. Her journey began when she moved to a new home and was looking for cleaning supplies.

Key Insights:
- Purchase decisions influenced by Amazon reviews and Prime membership
- Smartphone connectivity is a valued feature over traditional vacuums
- Visual content (pictures & videos) played a significant role in purchase decisions
- Price comparison with traditional vacuums justified the investment

Methodology: Qualitative interview and consumer behavior analysis framework.`,
    category: "Consumer Research",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    externalLink: "#",
    icon: Code,
    tools: ["Consumer Research", "Qualitative Analysis"],
    year: "2024",
    pdfUrl: "/documents/consumer-purchase-journey.pdf",
  },
  {
    id: 9,
    slug: "customer-commitment-study",
    title: "Customer Commitment Study",
    description:
      "Five-factor customer commitment analysis for Crew's Cup using Python - examining economic, forced, habitual, normative, and affective commitment drivers.",
    fullDescription: `A comprehensive customer commitment analysis for Crew's Cup fitness center, examining the optimal investment strategy to increase customer retention and reduce churn.

Background:
Crew's Cup underwent ownership changes, leading to customer churn rates of 70% annually. Through strategic interventions including the return of popular instructors and positive media coverage, churn was reduced to 60%. This analysis examines how to further improve retention.

Five-Factor Commitment Model:
1. Economic Commitment: Loyalty driven by benefits gained from being a customer
2. Forced Commitment: When customers feel compelled to stay due to external pressures
3. Habitual Commitment: Routine-based loyalty from consistent usage patterns
4. Normative Commitment: Moral or values-based connection to the brand
5. Affective Commitment: Emotional attachment and genuine love for the brand

Investment Options Analyzed:
- Monk's Strategy: Addressing normative commitment through brand values
- Proposed Subscription: Economic commitment through stable pricing
- Instructor's New Product: Reducing forced commitment through variety

Recommendation: Implement the Monk's Strategy focusing on normative commitment, as it encourages loyalty based on values rather than just personal benefit, creating more sustainable customer relationships.

Methodology: Survey of 1,500 respondents with cluster analysis and commitment factor modeling.`,
    category: ["Python", "Consumer Research"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    externalLink: "#",
    icon: Code,
    tools: ["Python", "Survey Analysis", "Cluster Analysis", "Customer Analytics", "Consumer Research"],
    year: "2024",
    pdfUrl: "/documents/customer-commitment-study.pdf",
    codeSnippet: `import pandas as pd
import seaborn as sns
import numpy as np 
import matplotlib.pyplot as plt 
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from factor_analyzer import FactorAnalyzer
import pingouin as pg

crewsCup = pd.read_csv("crews-cup-data.csv")
crewsCup.head()

# copy original df and store treatment to add back in later 
crewsCup = crewsCup.copy()
treatmentCol = crewsCup["treatment"] 

# drop categorical vars 
crewsCup = crewsCup.drop(["treatment", "id"], axis=1)

scaledFeatures = StandardScaler()
crewsCup = pd.DataFrame(scaledFeatures.fit_transform(crewsCup), columns=crewsCup.columns)

# create the scree plot 
fa = FactorAnalyzer(rotation=None)
fa.fit(crewsCup)

# get eigenvalues to see how many factors to keep 
eigenvalues, vectors = fa.get_eigenvalues()

# elbow plot 
plt.plot(range(1, len(eigenvalues) + 1), eigenvalues, marker="o")
plt.title("Scree Plot for EFA")
plt.xlabel("Number of Factors")
plt.ylabel("Eigenvalue")
plt.show()

# print eigenvalues to see which are > 1
np.set_printoptions(suppress=True, precision=3)
print("Eigenvalues:", eigenvalues)

# using five factors 
fiveFactors = FactorAnalyzer(n_factors=5, rotation="Varimax")
fiveFactors.fit(crewsCup)

# Get variance of each factor
varianceExplainedFiveF = fiveFactors.get_factor_variance()
print(round(varianceExplainedFiveF[1].sum()*100))

# get factor loadings
loadings = fiveFactors.loadings_

# get factor scores
factorScores = fiveFactors.transform(crewsCup)
loadings = pd.DataFrame(loadings, columns=["Factor 1", "Factor 2", "Factor 3", "Factor 4", "Factor 5"], index=crewsCup.columns)
round(loadings, 3)

# group variables by factors > 0.7 loading score are good  
factor1 = crewsCup[["f1", "f2", "f3", "h1", "h2", "h3", "e1", "e2", "e3", "classes"]]
factor2 = crewsCup[["n1", "n2", "n3"]]
factor3 = crewsCup[["origination", "classes", "contribution"]]
factor4 = crewsCup[["a1", "a2", "a3"]]
factor5 = crewsCup[["f1", "f2", "f3", "csat"]]

# calculate Cronbach's Alpha for each factor
chronAOne = round(pg.cronbach_alpha(factor1)[0],2)
chronATwo = round(pg.cronbach_alpha(factor2)[0],2)
chronAThree = round(pg.cronbach_alpha(factor3)[0],2)
chronAFour = round(pg.cronbach_alpha(factor4)[0],2)
chronAFive = round(pg.cronbach_alpha(factor5)[0],2)

# Factor 1 --> Convenience (Forced/Habitual Commitment)
# Factor 2 --> Emotional Connection (Affective Commitment)
# Factor 3 --> Ethical Duty (Normative Commitment)

# Add treatment back in
crewsCup["treatment"] = treatmentCol

# Check and calculate scores for each factor based on Cronbach's Alpha
if chronAOne >= 0.7:
    crewsCup["Convenience"] = factor1.mean(axis=1)
if chronATwo >= 0.7:
    crewsCup["Emotional Connection"] = factor2.mean(axis=1)
if chronAThree >= 0.7:
    crewsCup["Ethical Duty"] = factor3.mean(axis=1)
if chronAFour >= 0.7:
    crewsCup["Customer Engagement"] = factor4.mean(axis=1)
if chronAFive >= 0.7:
    crewsCup["Satisfaction"] = factor5.mean(axis=1)

# Group by treatment and calculate mean scores
scores = crewsCup.groupby("treatment")[["Convenience", "Emotional Connection", "Ethical Duty", "Customer Engagement", "Satisfaction"]].mean().reset_index()
scores = round(scores, 3)

# K-Means Clustering
from sklearn.decomposition import PCA
features = crewsCup[["Convenience", "Emotional Connection", "Customer Engagement"]]

scaler = StandardScaler()
scaleFeatures = scaler.fit_transform(features)

inertia = []
cluster_range = range(1, 11)

for k in cluster_range:
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(scaleFeatures)
    inertia.append(kmeans.inertia_)

# plotting scree plot 
plt.figure(figsize=(8, 5))
plt.plot(cluster_range, inertia, marker="o")
plt.xlabel("Number of Clusters")
plt.ylabel("Inertia")
plt.show()`,
  },
  {
    id: 10,
    slug: "ghanaian-day-names",
    title: "Ghanaian Day Names",
    description:
      "Interactive infographic exploring the Akan tradition of day naming in Ghana, featuring ethnic demographics and a day name finder tool.",
    fullDescription: `With many ways of naming babies, one common way that runs through all the tribes in Ghana is day naming. Day naming is where a child is given the day name corresponding to the day of the week he or she is born. By default, everybody has one – though the name may not necessarily appear on official documents such as Birth Certificates and Passports.

In Akan, which is the largest ethnicity in Ghana, the days of the week from Sunday to Saturday are: Kwasiada (Sunday), Ɛdwoada (Monday), Ɛbenada (Tuesday), Wukuada (Wednesday), Yawoada (Thursday), Efiada (Friday), and Memeneda (Saturday).

Ghana Constitutes:
47.5% of the people in Ghana are from the Akan Ethnicity. The other ethnicities include: 17% Dagbani, 14% Ewe, 7% Ga-Adangbe, 6% Gurma, 4% Guan, 2.5% Gurunsi, 1% Bissa.

The people of Akan have different dialects which includes but not limited to the Akuapem, Akwamu, Akyem, Bono, Agona, Wassa, Fante, Kwahu, Ahanta and Asante.

The icons shown are called Adinkra. They are symbols used by the people of Akan that represent concepts or aphorisms. Adinkra are used extensively in fabrics, logos and pottery.

Data source: thediasporacollective, worldpopulationreview, Creo(Ghanaba), Wikipedia
Icons: Noun Project`,
    category: ["Data Viz 4 Fun", "Tableau"],
    image: ghanaianDayNamesImg,
    externalLink:
      "https://public.tableau.com/app/profile/maureen.dzifa.awumee.quist/viz/Whatisyourdayname/Whatisyourdayname",
    icon: Calendar,
    tools: ["Tableau", "Cultural Research", "Infographic Design"],
    year: "2021",
  },
  {
    id: 11,
    slug: "cyclistic-bike-share",
    title: "Cyclistic Bike-Share Analysis",
    description:
      "Google Data Analytics Capstone project analyzing 4 million+ bike rides to understand differences between casual users and annual members.",
    fullDescription: `How Does a Bike-Share Navigate Speedy Success? This visualization explores the difference between a Cyclistic member and a regular user across the previous 12 months in Chicago.

Key Findings:
4,073,561 rides taken from June 2020 to May 2021
58% rides taken by members
42% rides taken by Casual users

Insights:
- Saturdays and Sundays are the weekend and people might take bike rides for leisure. It can be seen that as the week progresses into the weekend the number of rides grows.
- Casual users tend to take more bike rides as compared to members on the weekends and less on the weekdays.
- The peak of bike rides are around the summer months with August recording the highest bike trips of 622,361. 332,700 rides from members and 289,661 rides from casual users.
- Average Ride Time: Total 00:24:14, Casual Users 00:41:18, Members 00:11:50

Google Data Analytics Capstone | Track: 1 | Data: Motivate
Source: Coursera | Shapefile: Chicago Data Portal`,
    category: "Tableau",
    image: cyclisticRidesImg,
    externalLink: "https://public.tableau.com/app/profile/maureen.dzifa.awumee.quist/viz/CyclisticRides/CYCLISTICRIDES",
    icon: Bike,
    tools: ["Tableau", "Google Data Analytics", "Data Analysis"],
    year: "2021",
  },
  {
    id: 12,
    slug: "will-smith-filmography",
    title: "Will Smith's Filmography",
    description:
      "Interactive timeline visualization of Will Smith's career from 1990-2020, featuring movies and television appearances with toggle functionality.",
    fullDescription: `Willard Carrol Smith Jr. popularly known as Will Smith or Fresh Prince is an American actor, producer and rapper. He was born on September 25, 1968 and has been active in the occupation since 1986. In April 2007, Newsweek called him "the most powerful actor in Hollywood". Having his breakthrough when he played a fictionalized version of himself in the famous 1990s television sitcom The Fresh Prince of Bel-Air (binged watched over two times) which he served as an executive producer on 24 episodes of the series.

Timeline Highlights:
- 1990: Fresh Prince of Bel-Air debut
- 1996: Last Season of Fresh Prince of Bel-Air aired
- Career spanning from 1990 to 2020

The visualization features an interactive timeline where users can click on the years for more information, with a toggle between Movies and Television appearances.

Design: @dzidzi_quist / Data Source: Wikipedia`,
    category: ["Data Viz 4 Fun", "Tableau"],
    image: willSmithImg,
    externalLink:
      "https://public.tableau.com/app/profile/maureen.dzifa.awumee.quist/viz/WillSmithsFilmography/WillSmith",
    icon: Tv,
    tools: ["Tableau", "Wikipedia Data", "Timeline Design"],
    year: "2021",
  },
  {
    id: 13,
    slug: "street-names-accra",
    title: "Street Name Suffixes of Central Accra",
    description:
      "Geographic visualization mapping street name suffixes across Central Accra, revealing urban naming patterns and road classifications.",
    fullDescription: `This visualization explores the street name suffixes found in Central Accra, Ghana. Using geographic data from Open Street Map combined with Python, QGIS, and Tableau, the project reveals patterns in how streets are named across the city.

Street Name Suffixes Distribution:
- Unknown: 51.78%
- Road: 13.69%
- Avenue: 9.89%
- Street: 9.06%
- Central: 3.17%
- Close: 2.92%
- Lane: 2.24%
- Roundabout: 1.22%
- Link: 1.17%
- Crescent: 0.97%
- Drive: 0.93%
- Highway: 0.83%
- And various others including Agbogbloshie, Circle, East, Extension, Interchange, Loop, Oyeo, and Volta

The map displays the building footprints alongside the road network, color-coded by suffix type, providing insights into Accra's urban development and street naming conventions.

Data Source: Open Street Map
Tools: Python, QGIS, Tableau`,
    category: "Tableau",
    image: streetNamesAccraImg,
    externalLink:
      "https://public.tableau.com/app/profile/maureen.dzifa.awumee.quist/viz/MAPLAYERSOFSOMEPARTOFCENTRALACCRA/STREETNAMESSUFFIXES",
    icon: Map,
    tools: ["Tableau", "Python", "QGIS", "Open Street Map"],
    year: "2022",
  },
  {
    id: 14,
    slug: "injustice-2-characters",
    title: "Injustice 2: Character Analysis",
    description:
      "Interactive visualization of Injustice 2 game characters featuring stats comparison, character selection, and superhero/villain classification.",
    fullDescription: `Injustice 2 is the super-powered sequel to the hit game Injustice: Gods Among Us that allows players to build and power up the ultimate version of their favorite DC characters. Featuring a massive selection of DC Super Heroes and Super-Villains.

What's Your Fate?!! Select Your Character

The visualization features:
- Character Selection: Interactive circular character selector with all playable characters
- Superhero vs Villain Classification: Toggle between heroes and villains
- Sorting Options: Alphabetical sorting available
- Character Stats: Radar chart displaying Defense, Strength, Ability, and Health stats for each selected character
- Character Descriptions: Detailed backstory for each character

Example - Batman:
"There are lines we don't cross. Even after he's been exposed to the world as Batman, Bruce Wayne keeps his vow to avenge his parents' death by fighting for justice. He refuses to execute his enemies, believing that once he crosses that line, he's no better than the cowards he battles."

#GamesNightViz
Data Source: RankedBoost | Injustice.com
Icons: Injustice.fandom
Radar Tutorial: Cj Mayes
Radial Tutorial: Lindsay Betzendahl`,
    category: ["Data Viz 4 Fun", "Tableau"],
    image: injustice2Img,
    externalLink:
      "https://public.tableau.com/views/INJUSTICE2/INJUSTICE2?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    icon: Gamepad2,
    tools: ["Tableau", "Game Data", "Radar Charts", "Interactive Design"],
    year: "2022",
  },
  {
    id: 15,
    slug: "ghana-2016-elections",
    title: "Is Ghana A Two Party State?",
    description:
      "Deep dive into Ghana's 2016 Presidential Election with voter statistics, regional analysis, and constituency-level results visualization.",
    fullDescription: `Politics of Ghana takes place in a framework of a presidential representative democratic republic, whereby the President of Ghana is both head of state and head of government, and of a multi-party system. In past elections years, although the country has several political parties, the trend has been seen that most citizens prefer to either vote for the New Patriotic Party (NPP) or the National Democratic Congress (NDC).

2016 Presidential Election:
- NPP (Nana A. Akuffo-Addo): 53.72%
- NDC (John Dramani Mahama): 44.53%
- Others: 1.74%

Voters' Statistics:
- Registered Voters: 15,639,690
- Ballots Cast: 10,881,083
- Valid Votes: 10,713,734
- Rejected Ballots: 167,349

69.57% of registered voters in 2016 exercised their right to vote in Ghana. Out of which 10,881,083 casted ballots, 98% were rendered valid.

The visualization includes:
- Regional map view with constituency filtering
- Constituency-level results with percentage breakdown
- Winner analysis by region (e.g., Ashanti Region: Winner Nana A. Akuffo-Addo, Percent Win 75.98%)

Design: Maureen Dzifa Quist | Icons: Flaticons`,
    category: "Tableau",
    image: ghana2016ElectionsImg,
    externalLink:
      "https://public.tableau.com/app/profile/maureen.dzifa.awumee.quist/viz/2016PresidentialElectionV2/2016Eelections",
    icon: Vote,
    tools: ["Tableau", "Electoral Data", "Geographic Mapping", "Mapbox"],
    year: "2020",
  },
  {
    id: 16,
    slug: "african-writers-books",
    title: "The Read: Books by African Writers",
    description:
      "Creative bookshelf visualization showcasing books by African writers with reading status, book dimensions, and author information.",
    fullDescription: `Going back to reading has been somewhat of an experience. Although I do not read frequently or as much as I want to, I have found that my love for greek mythology still holds but I have discovered a new love for reading books by African Writers.

How To Read:
Book colour may not be accurate since there may exist different book covers. This is my view of the colors.
Note: A book may have different publishers, publishing dates and may have different book dimensions and pages.

Colour of Bookmark:
1. Read (completed)
2. Reading (in progress)
3. Yet to (on the list)

Sorting:
Books are sorted by reading status and in alphabetical order and not ranked in terms of favorite. The view below is a bar chart of the height and the size by pages of the books. Note: the actual book dimension is in inches.

Featured Books Include:
Maame, You made a fool of death with your beauty, Yinka where is your huzband?, A Broken People's Playlist, Home Going, Honey & Spice, Love in color, Nearly all the men in Lagos are Mad, On rotation, Rootless, Small Worlds, The List, Wahala, and many more.

Made by Dzifa Quist
Data: Wikipedia | Goodreads | Amazon
Inspiration: Adedamola (Damola) Ladipo
Ubuntu - I am because you are`,
    category: ["Data Viz 4 Fun", "Tableau"],
    image: africanWritersBooksImg,
    externalLink:
      "https://public.tableau.com/views/AfricanWriters-BooksDraft/AFRICANWRITERS-BOOKS?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    icon: BookOpen,
    tools: ["Tableau", "Creative Design", "Book Data"],
    year: "2023",
  },
  {
    id: 17,
    slug: "hr-dashboard",
    title: "Human Resource Dashboard",
    description:
      "Executive HR analytics dashboard featuring employee demographics, location distribution, diversity metrics, and department summaries.",
    fullDescription: `RWFD 2020 Employee Statistics Dashboard - A comprehensive human resource analytics solution providing insights into workforce composition and distribution.

Key Metrics:
- Number of Employees: 1,012
- Number of Active Employees: 1,009
- Average Age: 37
- Average Tenure: 1 year

Employees by Location:
- Ohio: 826 (Headquarters)
- Indiana: 38
- Pennsylvania: 38
- Illinois: 35
- Michigan: 34
- Kentucky: 25
- Wisconsin: 16

With options to filter by All, Headquarters, and Remote workers.

Diversity Metrics:
Gender Distribution:
- Male: 525
- Female: 463
- Non-Conforming: 24

Race Distribution:
- White: 286
- Two or More Races: 189
- Black or African American: 186
- Asian: 140
- Hispanic or Latino: 106
- American Indian or Alaska Native: 56
- Native Hawaiian or Other Pacific Islander: 49

Age Distribution: Visualized across age groups from 20-55+

The dashboard includes navigation for Human Resource overview, Employee Directory, and Department Summary views.`,
    category: "Tableau",
    image: hrDashboardImg,
    externalLink:
      "https://public.tableau.com/views/HumanResource-RealWorldFakeDataV_2/HumanResourceDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    icon: Building2,
    tools: ["Tableau", "HR Analytics", "Business Intelligence"],
    year: "2021",
  },
  {
    id: 18,
    slug: "bob-marley-tribute",
    title: "My Cousin's Love for Bob Marley",
    description:
      "Personal data visualization tribute exploring a cousin's love for Bob Marley, featuring favorite songs from the Legend album with popularity scores.",
    fullDescription: `Audrey's love for Bob Marley is very fascinating. Apart from she sharing the same birthday with Bob, she is a lover of most of his songs for a myriad of reasons.

She adores his positive VIBRATIONS and loves the fact that Bob's words are quite deep and they reflect things happening in today's world.

As popular as Bob Marley is, his song three little birds speaks to a lot of people. Great to ease ANXIETY and STRESS.

Each bird represents her top favourite songs. Each box represents the songs in her favourite album, LEGEND and the size its popularity.

About Bob Marley:
Born on February 6, 1945 in Jamaica, Robert Nesta Marley was considered one of the pioneers of reggae. His songs still live on as we enjoy the beautiful impactful words he shared with the world.

The visualization features:
- Portrait illustration of Bob Marley
- Interactive song boxes from the Legend album
- Popularity score visualization
- Bird motifs representing top 3 favorite songs

Enjoy Bob Marley's songs as Audrey enjoys them.

Design: @dzidzi_quist`,
    category: ["Data Viz 4 Fun", "Tableau"],
    image: bobMarleyTributeImg,
    externalLink:
      "https://public.tableau.com/views/BobMarley/BobMarley?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    icon: Heart,
    tools: ["Tableau", "Personal Data", "Creative Design", "Music Data"],
    year: "2022",
  },
  {
    id: 19,
    slug: "inukki",
    title: "Inukki",
    description:
      "Your digital closet and style assistant.",
    fullDescription: `Inukki helps you organize your wardrobe, plan outfits, track what you wear, and receive personalized style recommendations — all from your browser.

It is intentionally built as a mobile-first Progressive Web App (PWA) and installed directly to your home screen for a native-like experience.

Originally prototyped in Lovable, the project was later migrated into a fully self-managed codebase developed using Claude Code — where I continue to use vibe coding within a structured, production-grade architecture and deploy via Vercel.`,
    category: ["Product", "Consumer Research"],
    image: inukkiImg,
    externalLink: "https://inukki.vercel.app/",
    icon: Shirt,
    tools: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Framer Motion", "TanStack React Query", "Supabase", "Google Gemini", "Vercel", "Vitest", "PWA", "GitHub"],
    year: "2026",
    customCaseStudy: true,
    hidden: true,
  },
  {
    id: 20,
    slug: "brickdex",
    title: "BrickDex",
    description:
      "A LEGO rebuild assistant that maps every piece back to its bag so you can sort loose bricks and follow the instructions step by step.",
    fullDescription: `BrickDex was born out of a very real frustration — a beloved LEGO set knocked off the table, hundreds of pieces scattered across the floor, with no way to tell which brick belonged to which bag. Hours of flipping through the instruction booklet and squinting at tiny part images followed. That moment of chaos inspired this tool: a simple way to map every piece back to its bag, so you can rebuild with confidence and skip the sorting headache.

Enter any LEGO set number and BrickDex shows you every bag and its pieces, letting you sort your loose bricks and follow the builder's guide step by step. It pulls set and part data from Rebrickable and instruction booklet data from Brickset — two independent LEGO fan databases.

The app features a clean, minimal interface with theme customization, dark mode support, and a responsive layout that works on both desktop and mobile. Built entirely using Claude Code and deployed via Vercel.`,
    category: "Product",
    image: brickdexImg,
    externalLink: "https://brick-dex.vercel.app",
    icon: Building2,
    tools: ["React", "TypeScript", "Tailwind CSS", "Claude Code", "Vercel", "Rebrickable API", "Brickset API"],
    year: "2026",
    hidden: true,
  },
  {
    id: 21,
    slug: "reelfeel",
    title: "ReelFeel",
    description:
      "A film and TV diary that logs how a watch made you feel, and rates TV an episode at a time. Built end to end with an agent.",
    fullDescription: `ReelFeel started as a conversation. Someone described two things they wanted and could not find in one place: a way to react to a film with how it actually made them feel, and a way to rate individual episodes of a season rather than stamping one score on a whole show.

Both were worth building. The second question was mine: given an agent, could I take something like this all the way — data model, mobile app, backend, release build — end to end?

The answer to the first request is emotion tagging. Every diary entry pairs the usual — date, 0–5 stars, a written review, a rewatch flag — with tags drawn from 35 curated feelings across eight categories: Happy, Sad, Neutral, Surprised, Interested, Afraid, Disgusted, Angry. The payoff lands on the profile, where "What Moves You" ranks the emotions felt most across the whole diary. A year of watching resolves into something you can read back: mostly Neutral, often Tearful, In love four times.

The answer to the second is that TV is logged at episode resolution. Entries carry season and episode numbers, so a season you loved and a season that lost you are two different records, and an episode that wrecked you gets its own rating and its own emotion.

The rest of the app:
- Discover: a hero carousel, genre filters, and rails for Now Playing and Trending This Week
- Diary and Library: every session logged, with an activity calendar, a per-entry share sheet, and running stats
- Watchlist: saved titles with unreleased ones flagged as coming soon, cleared once a watch is logged
- Search: full-text TMDB search, plus recommendations that say why they are there — "Loved: The Odyssey" — instead of presenting a black box
- Profile: totals and watch time, a logging streak, and light, dark or system appearance

Built in Expo and React Native on Supabase, with Row Level Security so a user can only ever read and write their own rows. TMDB supplies the film and TV metadata. reelfeel.me is the marketing site — deliberately no app functionality on the web; the product is the phone.

Built through EAS Build and distributed on internal TestFlight.`,
    category: ["Product", "Consumer Research"],
    image: reelfeelImg,
    externalLink: "https://reelfeel.me",
    ctaLabel: "Visit reelfeel.me",
    icon: Clapperboard,
    tools: ["React Native", "Expo Router", "Supabase", "PostgreSQL", "Row Level Security", "TMDB API", "EAS Build", "TestFlight"],
    year: "2026",
  },
  {
    id: 22,
    slug: "thyve",
    title: "Thyve",
    description:
      "An iOS health companion I built for myself while managing my own thyroid on PTU. Readiness, labs, food, movement and cycle in one place, with an AI that already knows the numbers.",
    fullDescription: `Using an agent, I built Thyve for myself, while managing my own thyroid. Graves disease on PTU means labs on a schedule, a medication you cannot miss, food that interacts with the condition, and a body whose energy is not the same day to day — spread across a patient portal, a notes app, a pill reminder and a cycle tracker that know nothing about each other. Thyve is what it looks like when one app holds all of it.

Six tabs:
- Today: a readiness score built from Apple Health — resting heart rate, heart rate, HRV and sleep — over the latest labs, the next draw date, the next appointment, and the day's PTU dose with a running adherence count
- Labs: a plain-English headline on the current panel, then TSH, Free T4, Total T3 and TSI on reference-range bars, each dated entry expandable into what the number actually means
- Food: iodine and selenium against daily targets tuned for hyperthyroidism, meals logged across breakfast, lunch, dinner and snack, and a favourites shelf carrying Ghanaian staples — tilapia as Nkran fish, alongside salmon and eggs
- Move: a month heatmap keyed by session intensity, with recommendations drawn from cycle phase history rather than a generic plan
- Cycle: phase calendar across menstrual, follicular, ovulation and luteal, daily logging, and predictions for the next period and fertile window
- Ask: a companion running on the Claude API, with the condition, medication, latest labs, readiness and cycle phase assembled on-device and sent as context, so there is no re-explaining the situation before every question

Movement and cycle are wired together rather than sitting in separate tabs: the workout suggested on a given day comes from where you are in your cycle, which is a connection a general fitness app has no reason to make and a thyroid condition makes necessary.

The privacy model is the architecture. No servers, no accounts, no sync — records stay on the device, Apple Health is read-only, and only the context blocks you leave switched on travel with an AI question. Settings lets you turn all of them off.

The interface is dark by default — sage green on near-black, with handwritten type — so that checking labs at 7am reads like a notebook rather than a chart.

In testing now, and still being refined.`,
    category: "Product",
    image: thyveImg,
    externalLink: "#",
    icon: Activity,
    tools: ["React Native", "Expo", "Expo Router", "TypeScript", "HealthKit", "Claude API", "EAS Build", "TestFlight"],
    year: "2026",
  },
];

const byYearDesc = (a: Project, b: Project) => parseInt(b.year) - parseInt(a.year);

/**
 * Every project in the portfolio, archived ones included. Use this only for
 * slug lookups so archived case studies stay reachable by direct URL.
 */
export const allProjects: Project[] = [...unsortedProjects].sort(byYearDesc);

/** Projects that render in listings. Anything marked `hidden` is filtered out. */
export const projects: Project[] = allProjects.filter((p) => !p.hidden);

export const categories = ["All", "Tableau", "Python", "Data Viz 4 Fun", "Consumer Research", "Product"];

export const categoryIcons: Record<string, typeof BarChart2> = {
  Tableau: BarChart2,
  Python: Code,
  "Data Viz 4 Fun": BarChart2,
};

/**
 * Label for a project's call-to-action button. Prefers an explicit `ctaLabel`,
 * otherwise infers one from where the link points.
 */
export const getCtaLabel = (project: Project): string => {
  if (project.ctaLabel) return project.ctaLabel;
  const link = project.externalLink ?? "";
  if (link.includes("apps.apple.com")) return "View on the App Store";
  if (link.includes("play.google.com")) return "View on Google Play";
  if (link.includes("github.com")) return "View on GitHub";
  if (link.includes("public.tableau.com")) return "View on Tableau Public";
  if (link.includes("lovable.app") || link.includes("vercel.app")) return "View App";
  return "View Project";
};

export const getProjectBySlug = (slug: string): Project | undefined => {
  return allProjects.find((p) => p.slug === slug);
};
