from app.models import db, Park

def seed_parks():
    dolores = Park(
        name='Mission Dolores Park',
        address='Dolores St &, 19th St',
        city='San Francisco',
        state='California',
        zip_code=94114,
        description='This San Francisco classic is a hot spot for picnics & people-watching.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645045904/our-spot/dolorspark_jx0o3k.jpg'
    )

    alta_plaza = Park(
        name='Alta Plaza Park',
        address='Jackson St. &, Steiner St',
        city='San Francisco',
        state='California',
        zip_code=94115,
        description='Alta Plaza is known for its panoramic view of the city. There\'s a playground, tennis court, and grand staircase that rises to a central plateau to admire the view from.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1649094917/our-spot/IMG_4025_eeplih.jpg'
    )

    alamo_square = Park(
        name='Alamo Square Park',
        address='Hayes St',
        city='San Francisco',
        state='California',
        zip_code=94117,
        description='A beloved neighborhood park that houses the "Painted Ladies", well known for its appearances in movies and tv shows.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645045904/our-spot/Alamo-Sq_odqstp.jpg'
    )

    buena_vista = Park(
        name='Buena Vista Park',
        address='Buena Vista & Haight Street',
        city='San Francisco',
        state='California',
        zip_code=94117,
        description='Verdant, 36-acre park featuring trails, live oak groves, San Francisco city vistas & more.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645764502/our-spot/GettyImages-160426224-5c529731c9e77c0001380ad0_ap03fj.webp'
    )

    tank_hill = Park(
        name='Tank Hill Park',
        address='Twin Peaks Blvd',
        city='San Francisco',
        state='California',
        zip_code=94114,
        description='Intimate spot with flower-lined paths & rocky outcroppings offering views of the city & the bay.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645764893/our-spot/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvMjI0NjY1NzMvYTMxYjI1MWY4MDJhZDZmOGYzMzE5YjRiNzhjNDU1ZjEuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Iml_hodn99.jpg'
    )

    albany_bulb = Park(
        name='Albany Bulb',
        address='1 Buchanan St',
        city='Albany',
        state='California',
        zip_code=94706,
        description='Former landfill now a waterside park with graffiti art, a beach, hiking trails & skyline views.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645927845/our-spot/PXL_20210206_231833202_pnncyw.jpg'
    )

    cesar_chavez = Park(
        name='Cesar Chavez Park',
        address='11 Spinnaker Way',
        city='Berkeley',
        state='California',
        zip_code=94710,
        description='Popular, 90-acre park featuring kite flying opportunities, a dog run, bay vistas & more.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645769056/our-spot/Solar-calendar-by-KAP-Chris_twbsbh.jpg'
    )

    strawberry_creek = Park(
        name='Strawberry Creek Park',
        address='1260 Allston Way',
        city='Berkeley',
        state='California',
        zip_code=94702,
        description='Neighborhood space features basketball, tennis & volleyball courts, a playground & BBQ picnic spots.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645770246/our-spot/berkeley-playground-strawberry-creek_c0jz4o.jpg'
    )

    cedar_rose = Park(
        name='Cedar Rose Park',
        address='1300 Rose St',
        city='Berkeley',
        state='California',
        zip_code=94702,
        description='5-acre city park featuring 2 play areas, a picnic site with BBQ grills & multiple sports courts.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645771192/our-spot/cedar_rose_zgu9lp.jpg'
    )

    moraga_commons = Park(
        name='Moraga Commons Park',
        address='1425 St Marys Rd',
        city='Moraga',
        state='California',
        zip_code=94556,
        description='A family friendly park filled with amenities such as skate park, picnic areas, bocce ball, playgrounds, and a bandshell.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645772130/our-spot/Document_ngiylx.jpg'
    )

    junipero_serra = Park(
        name='Junipero Serra Park',
        address='1801 Crystal Springs Rd',
        city='San Bruno',
        state='California',
        zip_code=94066,
        description='Park offering picnic areas, a creek & walking trails plus scenic views of the city, bay & mountains.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645773811/our-spot/3fbba0880e34cfe7c7eb5d322419485c__united_states_california_san_mateo_county_san_bruno_crystal_springs_road_1801_junipero_serra_parkhtml_asvhtf.jpg'
    )

    stulsaft = Park(
        name='Stulsaft Park',
        address='3737 Farm Hill Blvd',
        city='Redwood City',
        state='California',
        zip_code=94061,
        description='A 42-acre park featuring wooded trails as well as a playground, summer water feature & picnic area.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645775427/our-spot/Stulsaft_vkv4h0.jpg'
    )

    seal_point = Park(
        name='Seal Point Park',
        address='1901 J Hart Clinton Dr',
        city='San Mateo',
        state='California',
        zip_code=94401,
        description='Waterfront area featuring windsurfing, a biking trail, dog park & outdoor classrooms led by rangers.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645775812/our-spot/stand-between-and-singor_rf1gru.jpg'
    )

    leo = Park(
        name='Leo J. Ryan Park',
        address='650 Shell Blvd',
        city='Foster City',
        state='California',
        zip_code=94404,
        description='Lakeside park featuring a boardwalk, boat launch & grassy areas, plus tennis & basketball courts.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645895862/our-spot/5decd9fd9848839ba0373619fc5e7044_xgdhgs.jpg'
    )

    shoreline = Park(
        name='Shoreline Park',
        address='Highway 61',
        city='Alameda',
        state='California',
        zip_code=94502,
        description='This park provides a lovely view of the San Francisco skyline and features walking paths and picnic areas.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645900932/our-spot/F45C54A5-C69E-4BD9-B1F3-1C8BB36B25ED_s4cscr.jpg'
    )

    towata = Park(
        name='Towata Park',
        address='3342 Bridgeview Isle',
        city='Alameda',
        state='California',
        zip_code=94501,
        description='A small park featuring a walking path around the bend of the alameda main island.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645901061/our-spot/99E0A8EB-B5FE-4B28-ADEC-F66D71482468_j6jlpg.jpg'
    )

    baylands = Park(
        name='Baylands Park',
        address='999 E Caribbean Dr',
        city='Sunnyvale',
        state='California',
        zip_code=94089,
        description='Developed park of 70+ acres on San Francisco Bay with playgrounds, trails & a wetlands preserve.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645901416/our-spot/baylands_mv1slh.jpg'
    )

    briones = Park(
        name='Briones Park',
        address='600 Arastradero Rd',
        city='Palo Alto',
        state='California',
        zip_code=94306,
        description='Fanciful playground in a former apricot orchard with a field, basketball court and picnic tables.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645901550/our-spot/5779a28a0ec70fc2b2f6c3869ed83616_-united-states-california-santa-clara-county-palo-alto-green-acres-briones-park_b9e9v8.jpg'
    )

    byxbee = Park(
        name='Byxbee Park',
        address='2375 Embarcadero Rd',
        city='Palo Alto',
        state='California',
        zip_code=94303,
        description='Birdwatching, cycling & walking are popular at this park with sculpted earth & conceptual art.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645901704/our-spot/Palo_Alto_Baylands_January_2013_002_muhdir.jpg'
    )

    chabot = Park(
        name='Chabot Park',
        address='Estudillo Ave, Sylvian Cir',
        city='San Leandro',
        state='California',
        zip_code=94577,
        description='Leafy nature area with a big lake, hiking trails & a disc golf course, popular for fishing & biking.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645928468/our-spot/IMG_3706_lvw3iu.jpg'
    )

    levin = Park(
        name='Ed R. Levin County Park',
        address='3100 Calaveras Rd',
        city='Milpitas',
        state='California',
        zip_code=95035,
        description='Vast, natural retreat featuring 19 miles of trails, an off-leash dog park, a golf course & more.',
        imageURL='https://res.cloudinary.com/jenn/image/upload/v1645928808/our-spot/20220123_141252_zbrhae.jpg'
    )

    db.session.add(dolores)
    db.session.add(alta_plaza)
    db.session.add(alamo_square)
    db.session.add(buena_vista)
    db.session.add(tank_hill)
    db.session.add(albany_bulb)
    db.session.add(cesar_chavez)
    db.session.add(strawberry_creek)
    db.session.add(cedar_rose)
    db.session.add(moraga_commons)
    db.session.add(junipero_serra)
    db.session.add(stulsaft)
    db.session.add(seal_point)
    db.session.add(leo)
    db.session.add(shoreline)
    db.session.add(towata)
    db.session.add(baylands)
    db.session.add(briones)
    db.session.add(byxbee)
    db.session.add(chabot)
    db.session.add(levin)

    db.session.commit()


def undo_parks():
    db.session.execute('TRUNCATE parks RESTART IDENTITY CASCADE;')
    db.session.commit()
