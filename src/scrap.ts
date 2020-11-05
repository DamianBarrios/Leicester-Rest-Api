import cheerio from 'cheerio';
import axios from 'axios';
import Results, {IResults} from './models/results';
const url = 'https://es.betsapi.com/te/23452/Leicester';

export default axios.get(url).then(function(res){

    const $ = cheerio.load(res.data);
    $('tbody tr').each((i,el) => {
        const data:IResults = new Results({
            id: i,
            competition: $(el).find('td.league_n').text(),
            date: ($(el).find('.dt_n').html()),
            oponent: $(el).find('td').next().next().next().find('a').html(),
            result: $(el).find('td').next().next().next().next().html(),
            score: $(el).find('td').next().next().next().next().next().text().trim()
            
        })
        data.date.setFullYear(2020)
        const checkToSave = async () => {
            const check = await Results.findOne({date: data.date});
            if(!check){
                data.save()
            }
        }
        checkToSave();
        

    });
});


    
    