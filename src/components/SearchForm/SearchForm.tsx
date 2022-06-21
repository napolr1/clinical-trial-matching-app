import { useState } from 'react';
import type { ReactElement } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Button, Grid, Stack } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import {
  AgeTextField,
  BiomarkersAutocomplete,
  CancerStageAutocomplete,
  CancerSubtypeTextField,
  CancerTypeTextField,
  ECOGScoreAutocomplete,
  KarnofskyScoreAutocomplete,
  MedicationsAutocomplete,
  MetastasisTextField,
  RadiationAutocomplete,
  SurgeryAutocomplete,
  TravelDistanceTextField,
  ZipcodeTextField,
} from './FormFields';
import SearchImage from '@/assets/images/search.png';
import type { Patient } from '@/utils/patient';
import MatchingServices from './MatchingServices';
import { SearchFormValuesType } from './types';

export type SearchFormProps = {
  patient: Patient;
};

// Breast Cancer
let breastCancer_cancerType = [
  "INVASIVE_BREAST_CANCER_AND_RECURRENT",
  "LOCALLY_RECURRENT",
  "BREAST_CANCER",
  "CONCOMITANT_INVASIVE_MALIGNANCIES",
  "OTHER_MALIGNANCY_EXCEPT_SKIN_OR_CERVICAL",
];
let breastCancer_cancerSubType = [
  "INVASIVE_MAMMORY_CARCINOMA",
  "INVASIVE_DUCTAL_CARCINOMA",
  "INVASIVE_LOBULAR_CARCINOMA",
  "DUCTAL_CARCINOMA_IN_SITU",
  "NON-INFLAMMATORY_INVASIVE",
  "INVASIVE_CARCINOMA",
  "INVASIVE_BREAST_CANCER",
  "INFLAMMATORY",
];
let breastCancer_biomarkers = [
  "er+",
  "pr+",
  "her2+",
  "er-",
  "pr-",
  "her2-",
  "brca1",
  "brca2",
  "atm",
  "cdh1",
  "chek2",
  "nbn",
  "nf1",
  "palb2",
  "pten",
  "stk11",
  "p53",
  "rb",
  "her2",
  "fgfr",
  "esr1",
  "pik3ca",
  "pdl1",
  "ntrk_fusion",
];
let breastCancer_stage = [0, 1, 2.1, 2.2, 3.1, 3.2, 3.3, 4];
let breastCancer_medications = [
  "anastrozole",
  "exemestane",
  "letrozole",
  "tamoxifen",
  "toremifene",
  "fulvestrant",
  "raloxifene_hcl",
  "trastuzumab",
  "trastuzumab_hyaluronidase_conjugate",
  "trastuzumab_deruxtecan_conjugate",
  "pertuzumab",
  "lapatinib",
  "pertuzumab_trastuzumab_hyaluronidase",
  "tucatinib",
  "neratinib",
  "tdm1",
  "doxorubicin",
  "epirubicin",
  "cyclophosphamide",
  "cisplatin",
  "carboplatin",
  "paclitaxel",
  "docetaxel",
  "gemcitabine",
  "capecitabine",
  "vinblastine_sulfate",
  "sacituzumab_govitecan_hziy",
  "methotrexate",
  "fluorouracil",
  "vinorelbine",
  "eribuline",
  "ixabepilone",
  "etoposide",
  "pemetrexed",
  "irinotecan",
  "topotecan",
  "ifosfamide",
  "nivolumab",
  "avelumab",
  "thiotepa",
  "olaparib",
  "talazoparib",
  "atezolizumab",
  "pembrolizumab",
  "zoledronic_acid",
  "pamidronate",
  "denosumab",
  "bevacizumab",
  "everolimus",
  "progestin",
  "fluoxymesterone",
  "high_dose_estrogen",
  "palbociclib",
  "ribociclib",
  "abemaciclib",
  "alpelisib",
];
let breastCancer_procedures = [
  "lumpectomy",
  "mastectomy",
  "alnd",
  "reconstruction",
  "wbrt",
  "in_radiation",
  "metastasis_resection",
  "ablation",
  "rfa",
  "ebrt",
];

// Lung Cancer
let lungCancer_cancerType = [
  "nsclc",
  "sclc_limited_stage",
  "sclc_extensive_stage",
  "carcinoid",
];
let lungCancer_cancerSubType = [
  "adenocarcinoma",
  "scc",
  "large_cell",
  "large_cell_neuroendocrine",
  "adenosquamous",
  "sarcomatoid",
];
let lungCancer_biomarkers = [
  "er+",
  "pr+",
  "her2+",
  "er-",
  "pr-",
  "her2-",
  "brca1",
  "brca2",
  "atm",
  "cdh1",
  "chek2",
  "nbn",
  "nf1",
  "palb2",
  "pten",
  "stk11",
  "p53",
  "rb",
  "her2",
  "fgfr",
  "esr1",
  "pik3ca",
  "pdl1",
  "ntrk_fusion",
];
let lungCancer_stage = [0, 1, 2, 3.1, 3.2, 3.3, 3.4, 4];
let lungCancer_medications = [
  "cisplatin",
  "carboplatin",
  "paclitaxel",
  "docetaxel",
  "gemcitabine",
  "vinorelbine",
  "etoposide",
  "pemetrexed",
  "irinotecan",
  "topotecan",
  "bevacizumab",
  "ramucirumab",
  "erlotinib",
  "afatinib",
  "gefitinib",
  "osimertinib",
  "dacomitinib",
  "tak_788",
  "poziotinib",
  "lapatinib",
  "vandetanib",
  "panitumumab",
  "cetuximab",
  "necitumumab",
  "capmatinib",
  "pralsetinib",
  "neratinib",
  "trastuzumab",
  "pertuzumab",
  "ado_trastuzumab_emtansine",
  "crizotinib",
  "ceritinib",
  "alectinib",
  "brigatinib",
  "lorlatinib",
  "dabrafenib",
  "trametinib",
  "larotrectinib",
  "entrectinib",
  "nivolumab",
  "pembrolizumab",
  "atezolizumab",
  "durvalumab",
  "other_pd1_pdl1",
  "ipilimumab",
];
let lungCancer_procedures = [
  "pneumonectomy",
  "lobectomy",
  "segmentectomy_wedge_resection",
  "sleeve_resection",
  "metastasis_resection",
  "ablation",
  "rfa",
  "ebrt",
  "brachytherapy",
  "cranial_irradiation",
];

// Colon Cancer
let colonCancer_cancerType = ["colon", "rectal", "familial"];
let colonCancer_cancerSubType = ["afap", "lynch_syndrome", "hnpcc"];
let colonCancer_biomarkers = [
  "p53_tp53_deletion",
  "p53_tp53_mutation",
  "kras",
  "nras",
  "braf",
  "pi3k",
  "pik3ca",
  "pik3r1",
  "pten_loss",
  "wnt",
  "egfr",
  "erbb2_her2",
  ,
  "her3",
  "msi",
  "dmmr",
  "ret",
  "ntrk_fusion",
  "fgfr1",
  "fgfr2",
  "fgfr3",
  "nrg1",
];
let colonCancer_stage = [0, 1, 2, 3.1, 3.2, 3.3, 3.4];
let colonCancer_medications = [
  "capecitabine",
  "camptosar",
  "leucovorin_5_fu",
  "eloxatin",
  "lonsurf",
  "leucovorin_5_fu_oxaliplatin",
  "leucovorin_5_fu_irinotecan",
  "capecitabine_oxaliplatin",
  "leucovorin_5_fu_oxaliplatin_irinotecan",
  "haic",
  "avastin",
  "cyrazma",
  "zaltrap",
  "cetuximab",
  "panitumumab",
  "stivarga",
  "encorafenib",
  "entrectinib",
  "larotrectinib",
  "braftovi_erbitux_combo",
  "nivolumab",
  "pembrolizumab",
  "ipilimumab",
];
let colonCancer_procedures = [
  "colectomy",
  "colostomy",
  "ablation",
  "embolization",
  "radiation_colon_rectum",
  "lymph_radiation",
  "radiation_other",
];

// Brain Cancer
let brainCancer_cancerType = [
  "grade_1_astro",
  "grade_2_astro",
  "grade_3_astro",
  "gbm",
  "grade_2_oligo",
  "grade_3_oligo",
];
let brainCancer_cancerSubType = [
  "idh1",
  "idh2",
  "1p19q",
  "atrx",
  "tert",
  "h3f3a",
  "braf",
  "rela",
  "h3k27m",
  "egfr",
  "pdgfra",
  "rb1",
  "c_met",
];
let brainCancer_biomarkers = [
  "temozolomide",
  "lomustine",
  "carmustine",
  "carboplatin",
  "cisplatin",
  "bevacizumab",
  "other_anti_angiogenic",
  "procarbazine",
  "vincristine",
  "etoposide",
  "everolimus",
  "ipilimumab",
  "nivolumab",
  "pembrolizumab",
  "other_anti_pd_antibody",
  "interferon",
  "il_2",
  "ttf",
  "pvc",
  "mtor",
  "ido",
  "dexamethasone",
];

// Prostate Cancer
let prostateCancer_cancerType = [
  "adenocarcinoma",
  "scc",
  "intralobular_acinar",
  "ductal_carcinoma",
  "clear_cell",
  "mucinous_carcinoma",
  "sarcomatoid",
  "iac",
];
let prostateCancer_biomarkers = [
  "p53_tp53_deletion",
  "p53_tp53_mutation",
  "pten_loss",
  "ar",
  "apc",
  "brca2",
  "pik3ca",
  "ctnnb1",
  "atm",
  "jak1",
  "cdk12",
  "rb1",
  "rnf43",
  "chek2",
  "msh6",
  "mutyh",
  "brca1",
  "prkdc",
  "blm",
  "palb2",
  "fanca",
  "rad51d",
  "atr",
  "sod2",
  "erbb2_her2",
  "brip1",
  "chek1",
  "fancl",
  "ppp2r2a",
  "rad51b",
  "rad51c",
  "rad54l",
];
let prostateCancer_stage = [2.1, 2.2, 3.1, 3.2, 3.3, 4.1, 4.2];
let prostateCancer_medications = [
  "docetaxel",
  "paclitaxel",
  "cabazitaxel",
  "estramustine",
  "gemcitabine",
  "vinorelbine",
  "mitoxantrone",
  "pemetrexed",
  "irinotecan",
  "topotecan",
  "cisplatin",
  "carboplatin",
  "leuprolide",
  "goserelin",
  "triptorelin",
  "histrelin",
  "degarelix",
  "relugolix",
  "abiraterone",
  "ketoconazole",
  "flutamide",
  "bicalutamide",
  "nilutamide",
  "enzalutamide",
  "apalutamide",
  "darolutamide",
  "galeterone",
  "sipuleucel_t",
  "rucaparib",
  "olaparib",
  "nivolumab",
  "pembrolizumab",
  "atezolizumab",
  "durvalumab",
  "other_pd1_pdl1",
  "ipilimumab",
  "zoledronic_acid",
  "denosumab",
  "strontium_89",
  "samarium_153",
  "radium_223",
  "rhenium_186",
  "finasteride",
  "dutasteride",
];
let prostateCancer_procedures = [
  "radical_prostatectomy",
  "turp",
  "pelvic_lymph_node_dissection",
  "cryoablation",
  "hyperthermia",
  "surgical_castration",
  "ebrt",
  "brachytherapy",
  "cranial_irradiation",
  "pelvic_irradiation",
  "hifu",
  "laser_abalation",
  "microwave_abalation",
];

// MM Cancer
let mmCancer_cancerType = ["smoldering_mm", "active_mm"];
let mmCancer_medications = [
  "dexamethasone_prednisone",
  "pace",
  "bendamustine",
  "cisplatin",
  "cyclophosphamide",
  "doxorubicin",
  "etoposide",
  "melphalan",
  "panobinostat",
  "bortezomib",
  "carfilzomib",
  "ixazomib",
  "daratumumab",
  "elotuzumab",
  "isatuximab",
  "lenalidomide",
  "thalidomide",
  "pomalidomide",
  "selinexor",
  "abecma",
  "venetoclax",
  "bite",
  "belantamab",
  "clinical_trial",
];

const SearchForm = ({ patient }: SearchFormProps): ReactElement => {
  const router = useRouter();

  const [cancerTypes, setCancerTypes] = useState([]);
  const [cancerSubTypes, setCancerSubTypes] = useState([]);
  const [biomarkers, setBiomarkers] = useState([]);
  const [stages, setStages] = useState([]);
  const [medications, setMedications] = useState([]);
  const [procedures, setProcedures] = useState([]);

  const [selectVal, setSelectVal] = useState({
    cancerType: "",
    cancerSubType: "",
    biomarker: "",
    stage: "",
    medication: "",
    procedure: "",
  });

  const defaultValues: Partial<SearchFormValuesType> = {
    age: patient.age || '',
    cancerType: patient.cancerType || '',
    travelDistance: '100',
    zipcode: patient.zipcode || '',
  };

  const { handleSubmit, control } = useForm<SearchFormValuesType>({ defaultValues });
  const onSubmit = data => router.push({ pathname: '/results', query: data });

  const handleChange = (e) => {
    const val = e.target.value;

    switch (val) {
      case "0":
        setCancerTypes([]);
        setCancerSubTypes([]);
        setBiomarkers([]);
        setStages([]);
        setMedications([]);
        setProcedures([]);
        break;
      case "breast":
        setCancerTypes(breastCancer_cancerType);
        setCancerSubTypes(breastCancer_cancerSubType);
        setBiomarkers(breastCancer_biomarkers);
        setStages(breastCancer_stage);
        setMedications(breastCancer_medications);
        setProcedures(breastCancer_procedures);
        break;
      case "lung":
        setCancerTypes(lungCancer_cancerType);
        setCancerSubTypes(lungCancer_cancerSubType);
        setBiomarkers(lungCancer_biomarkers);
        setStages(lungCancer_stage);
        setMedications(lungCancer_medications);
        setProcedures(lungCancer_procedures);
        break;
      case "colon":
        setCancerTypes(colonCancer_cancerType);
        setCancerSubTypes(colonCancer_cancerSubType);
        setBiomarkers(colonCancer_biomarkers);
        setStages(colonCancer_stage);
        setMedications(colonCancer_medications);
        setProcedures(colonCancer_procedures);
        break;
      case "brain":
        setCancerTypes(brainCancer_cancerType);
        setCancerSubTypes(brainCancer_cancerSubType);
        setBiomarkers(brainCancer_biomarkers);
        setStages([]);
        setMedications([]);
        setProcedures([]);
        break;
      case "prostate":
        setCancerTypes(prostateCancer_cancerType);
        setCancerSubTypes([]);
        setBiomarkers(prostateCancer_biomarkers);
        setStages(prostateCancer_stage);
        setMedications(prostateCancer_medications);
        setProcedures(prostateCancer_procedures);
        break;
      case "mm":
        setCancerTypes(mmCancer_cancerType);
        setCancerSubTypes(mmCancer_medications);
        setBiomarkers([]);
        setStages([]);
        setMedications([]);
        setProcedures([]);
    }
  };

  const handleTypeChange = (e) => {
    const { name, value } = e.target;
    setSelectVal({
      ...selectVal,
      [name]: value,
    });
  };

  const renderEmptyOption = (item) => {
    return item.length > 0 ? <option value="none">Select Value</option> : "";
  };

  const renderSelectOptions = (typeList) => {
    return typeList.map((item) => (
      <option value={item} key={item}>
        {item}
      </option>
    ));
  };

  const saveData = () => {
    console.log(selectVal);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box bgcolor="grey.200">
        <Box p={{ xs: 0, md: 2 }} display={{ xs: 'none', md: 'block' }}>
          <Stack alignItems="center" direction={{ xs: 'column', lg: 'row' }} justifyContent="center">
            <Box>
              <Image
                src={SearchImage}
                alt="Clinical Trial Finder Search"
                layout="fixed"
                width={400}
                height={190}
                priority
              />
            </Box>

            <Box ml={{ md: 0, lg: 10 }} textAlign={{ xs: 'center', lg: 'left' }}>
              <Box fontSize={{ xs: 30, lg: 38, xl: 63 }} fontWeight={300}>
                Let's find some clinical trials
              </Box>

              <Box color="grey.600" fontSize={{ xs: 20, lg: 25, xl: 28 }} fontWeight={300}>
                Search with data populated from your record, or change to find matching trials
              </Box>
            </Box>
          </Stack>
        </Box>

        <Grid columns={8} container spacing={2} px={2} py={{ md: 2 }} pb={{ xs: 2 }} mt={{ xs: 0, md: -2 }}>
          <Grid item xs={8}>
            <MatchingServices control={control} />
          </Grid>

          <Grid item xs={8} md={4} lg={2} xl={1}>
            <Controller
              name="zipcode"
              defaultValue=""
              control={control}
              rules={{ required: true }}
              render={ZipcodeTextField}
            />
          </Grid>

          <Grid item xs={8} md={4} lg={2} xl={1}>
            <Controller name="travelDistance" defaultValue="" control={control} render={TravelDistanceTextField} />
          </Grid>

          <Grid item xs={8} lg={4} xl={2}>
            <Controller name="age" defaultValue="" control={control} render={AgeTextField} />
          </Grid>

          <Grid item xs={8} lg={4} xl={2}>
            {/* <Controller
              name="cancerType"
              defaultValue=""
              control={control}
              rules={{ required: true }}
              render={CancerTypeTextField}
            /> */}
            <select
              className="alert-info form-control w-100"
              id="cancerTypes"
              onChange={handleChange}
            >
              <option value={0}>Select Cancer Type</option>
              <option value="breast">Breast Cancer</option>
              <option value="lung">Lung Cancer</option>
              <option value="colon">Colon Cancer</option>
              <option value="brain">Brain Cancer</option>
              <option value="prostate">Prostate Cancer</option>
              <option value="mm">MM Cancer</option>
            </select>
          </Grid>

          <Grid item xs={8} lg={4} xl={2}>
            {/* <Controller name="cancerSubtype" defaultValue="" control={control} render={CancerSubtypeTextField} /> */}
            <h6>Cancer Subtypes</h6>
            <select
              className="alert-info form-control"
              id="cancerSubType"
              onChange={handleTypeChange}
              name="cancerSubType"
            >
              {renderEmptyOption(cancerSubTypes)}
              {renderSelectOptions(cancerSubTypes)}
            </select>
          </Grid>

          <Grid item xs={8} lg={4} xl={2}>
            <Controller name="metastasis" defaultValue="" control={control} render={MetastasisTextField} />
          </Grid>

          <Grid item xs={8} lg={4} xl={2}>
            {/* <Controller name="stage" defaultValue={null} control={control} render={CancerStageAutocomplete} /> */}
            <h6>Stage</h6>
            <select
              className="alert-info form-control"
              id="stage"
              onChange={handleTypeChange}
              name="stage"
            >
              {renderEmptyOption(stages)}
              {renderSelectOptions(stages)}
            </select>
          </Grid>

          <Grid item xs={8} lg={4} xl={2}>
            <Controller name="ecogScore" defaultValue={null} control={control} render={ECOGScoreAutocomplete} />
          </Grid>

          <Grid item xs={8} lg={4} xl={2}>
            <Controller
              name="karnofskyScore"
              defaultValue={null}
              control={control}
              render={KarnofskyScoreAutocomplete}
            />
          </Grid>

          <Grid item xs={8}>
            {/* <Controller name="biomarkers" defaultValue={[]} control={control} render={BiomarkersAutocomplete} /> */}
            <h6>Biomarkers</h6>
            <select
              className="alert-info form-control"
              id="biomarkers"
              onChange={handleTypeChange}
              name="biomarker"
            >
              {renderEmptyOption(biomarkers)}
              {renderSelectOptions(biomarkers)}
            </select>
          </Grid>

          <Grid item xs={8}>
            <Controller name="radiation" defaultValue={[]} control={control} render={RadiationAutocomplete} />
          </Grid>

          <Grid item xs={8}>
            <Controller name="surgery" defaultValue={[]} control={control} render={SurgeryAutocomplete} />
          </Grid>

          <Grid item xs={8}>
            {/* <Controller name="medications" defaultValue={[]} control={control} render={MedicationsAutocomplete} /> */}
            <h6>Medication</h6>
            <select
              className="alert-info form-control"
              id="medication"
              onChange={handleTypeChange}
              name="medication"
            >
              {renderEmptyOption(medications)}
              {renderSelectOptions(medications)}
            </select>
          </Grid>

          <Grid item xs={8}>
            <Button
              sx={{
                borderRadius: '0',
                color: 'common.white',
                float: 'right',
                fontSize: '1.3em',
                fontWeight: '500',
                height: '50px',
                width: '25%',
              }}
              type="submit"
              variant="contained"
            >
              <SearchIcon sx={{ paddingRight: '5px' }} /> Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default SearchForm;
