/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
import React from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import SearchBar from '../../components/SearchBar/SearchBar';
import classes from './App.module.css';
import PersonCardSummary from '../../components/PersonCardSummary/PersonCardSummary';
import PersonDrawer from '../../components/PersonDrawer/PersonDrawer';
import { Link } from 'react-router-dom';
import IconButton from '../../components/IconButton/IconButton';
import EncounterSummary from '../../components/EncounterCardSummary/EncounterSummary';
import EncounterDrawer from '../../components/EncounterDrawer/EncounterDrawer';

// The maximum summary cards shown on the large screens, small screens show less
const MAX_LATEST_CARDS = 12;

function App() {
  const [selectedInfo, setSelectedInfo] = React.useState(undefined);
  // @TODO: Input real data. Get 12 people and 12 encounters. Get all info needed for seach bar. Get user.

  // TEMPORARY FAKE DATA
  const user = { first_name: 'PersonName' };
  const personList = [{
    id: '0',
    name: 'Name',
    img: 'https://avatars.githubusercontent.com/u/28725774?v=4',
    firstMet: new Date(),
    socialMedias: [{ name: 'facebook', link: 'https://www.google.com/' }, { name: 'instagram', link: 'https://www.google.com/' }],
    location: 'Auckland',
    interests: ['art', 'sewing', 'coding'],
  },
  ];
  for (let i = 1; i < MAX_LATEST_CARDS; i++) {
    personList[i] = { ...personList[0], name: 'P' + i };
  }
  const encounterList = [{
    id: '0',
    title: 'encountername',
    date: new Date(),
    description: 'this is a description ',
    summary: 'summary here',
    persons: [personList[0], personList[0]],
  },
  ];
  for (let i = 1; i < MAX_LATEST_CARDS; i++) {
    encounterList[i] = { ...encounterList[0], name: 'encounter' + i };
  }

  const searchBarData = [{ title: 'fgdgf' }, { title: 'joe' }, { title: 'xi' }, { title: 'abcdef' }];
  // END TEMP FAKE DATA

  const handlePersonHover = (event, index) => {
    setSelectedInfo({
      type: 'person',
      info: personList[index],
    });
  };

  const handleEncounterHover = (event, index) => {
    setSelectedInfo({
      type: 'encounter',
      info: encounterList[index],
    });
  };

  const handleNewEntryClick = (event) => {
    // @TODO: Need dialog/popup to do the new entry.
  };

  return (
    <>
      {selectedInfo && <SummaryDrawer summaryInfo={selectedInfo} />}

      <div className={classes.home_container}>
        <div className={classes.home_title}>
          Hi {user.first_name}, Welcome back!
        </div>

        <div className={classes.home_searchArea}>
          <SearchBar placeholder={'Search'} data={searchBarData} />
          <div className={classes.home_newEntryBtn}>
            <IconButton btnText="New Entry" onClick={handleNewEntryClick} includeIcon={true} />
          </div>
        </div>

        <div className={classes.home_subtitleContainer}>
          <div className={classes.home_subtitle}>Recently Updated</div>
          <Link to="/people" style={{ textDecoration: 'none' }}><CustomButton btnText='View All' /></Link>
        </div>

        <div className={classes.home_cardGridContainer + ' ' + classes.home_personGridContainer}>
          {personList.map((person, index) => {
            return (
              <div key={index} className={classes.home_cardWrapper} onMouseEnter={(event) => handlePersonHover(event, index)}>
                <Link to={`/people/${person.id}`} style={{ textDecoration: 'none' }}>
                  <PersonCardSummary
                    id={person.id}
                    name={person.name}
                    img={person.img}
                    firstMet={person.firstMet}
                    onClick={() => { }}
                  />
                </Link>
              </div>);
          })}
        </div>

        <div className={classes.home_subtitleContainer}>
          <div className={classes.home_subtitle}>Recently Encounters</div>
          <Link to="/encounters" style={{ textDecoration: 'none' }}><CustomButton btnText='View All' /></Link>
        </div>

        <div className={classes.home_cardGridContainer + ' ' + classes.home_encounterGridContainer}>
          {encounterList.map((encounter, index) => {
            return (
              <div key={index} className={classes.home_cardWrapper} onMouseEnter={(event) => handleEncounterHover(event, index)}>
                <Link to={`/encounters/${encounter.id}`} style={{ textDecoration: 'none' }}>
                  <EncounterSummary
                    name={encounter.persons[0]?.name}
                    date={encounter.date}
                    description={encounter.description}
                    summary={encounter.title}
                    src={encounter.persons[0]?.img}
                  />
                </Link>
              </div>);
          })}
        </div>

      </div>
    </>
  );
}

function SummaryDrawer(summaryInfo) {
  summaryInfo = summaryInfo.summaryInfo;
  if (summaryInfo.type === 'person') {
    return <PersonDrawer
      open={true}
      id={summaryInfo.info.id}
      name={summaryInfo.info.name}
      img={summaryInfo.info.img}
      firstMet={summaryInfo.info.firstMet}
      onClick={summaryInfo.info.onClick}
      location={summaryInfo.info.location}
      gender={summaryInfo.info.gender}
      organisation={summaryInfo.info.organisation}
      interests={summaryInfo.info.interests}
      socialMedias={summaryInfo.info.socialMedias}
    />;
  } else if (summaryInfo.type === 'encounter') {
    return <EncounterDrawer
      open={true}
      id={summaryInfo.info.id}
      encounterTitle={summaryInfo.info.title}
      img={summaryInfo.info.persons[0]?.img}
      persons={summaryInfo.info.persons}
      dateMet={summaryInfo.info.date}
      location={summaryInfo.info.location}
      encounterDetail={summaryInfo.info.description} // TODO: remove this when typo is fixed.
      encounterDetails={summaryInfo.info.description}
    />;
  }
}

export default App;
