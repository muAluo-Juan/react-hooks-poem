import { List, Icon, Button } from 'antd';
import '../styles/components/poetintro.css'

const data = [];
for (let i = 0; i < 700; i++) {
    data.push({
        name: '屈原',
        intro: '屈原（约公元前340—公元前278年），中国战国时期楚国诗人、政治家。出生于楚国丹阳秭归（今湖北宜昌）。芈姓，屈氏，名平，字原；又自云名正则，字灵均。楚武王熊通之子屈瑕的后代。少年时受过良好的教育，博闻强识，志向远大。早年受楚怀王信任，任左徒、三闾大夫，兼管内政外交大事。 提倡“美政”，主张对内举贤任能，修明法度，对外力主联齐抗秦。因遭贵族排挤诽谤，被先后流放至汉北和沅湘流域。 楚国郢都被秦军攻破后，自沉于汨罗江，以身殉楚国。屈原是中国历史上一位伟大的爱国诗人，中国浪漫主义文学的奠基人，“楚辞”的创立者和代表作家，开辟了“香草美人”的传统，被誉为“楚辞之祖”，楚国有名的辞赋家宋玉、唐勒、景差都受到屈原的影响。屈原作品的出现，标志着中国诗歌进入了一个由大雅歌唱到浪漫独创的新时代 ，其主要作品有《离骚》《九歌》《九章》《天问》等。以屈原作品为主体的《楚辞》是中国浪漫主义文学的源头之一，以最著名的篇章《离骚》为代表的《楚辞》与《诗经》中的《国风》并称为“风骚”，对后世诗歌产生了深远影响。1953年，在屈原逝世2230周年之际，世界和平理事会通过决议，确定屈原为当年纪念的世界四大文化名人之一。',
        poemNumber: 520,
        avator: 'https://song.gushiwen.cn/authorImg/quyuan.jpg'
    })
}
const PoetIntro = () => {
    return (
        <List
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 10,
            }}
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <div className="poet-intro-div">
                        <img src={item.avator} width={110} />
                        <div>
                            <h2><a href={item.href}>{item.name}</a></h2>
                            <div className="poet-intro-content-div">
                                {item.intro}
                                <a href="http://localhost:3000"><Icon type="caret-right" />{item.poemNumber}篇诗文（仅包含已收录）</a>
                            </div>
                            <Button size="small" style={{ fontSize: '0.8rem', float: 'right' }}>完善</Button>
                        </div>
                    </div>
                </List.Item>
            )}
        />
    )
}

export default PoetIntro