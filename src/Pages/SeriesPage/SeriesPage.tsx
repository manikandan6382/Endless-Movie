import Nav from "../../components/Nav/Nav";
import Banner from "../../components/Banner/Banner";
import ContentFilters from "../../components/ContentFilter/ContentFilter";
import GenreFilter from "../../components/GenreFilter/GenreFilter";

const SeriesPage = () => {
  return (
    <div className="min-h-screen bg-netflix-dark-gray flex flex-col text-white">
      <Nav />
      {/* Add padding for fixed navigation */}
      <div className="pt-20 md:pt-24 pb-20 lg:pb-5">
        <Banner contentType="tv" />
        <ContentFilters contentType="tv" />
        <GenreFilter contentType="tv" />
      </div>
    </div>
  );
};

export default SeriesPage;
