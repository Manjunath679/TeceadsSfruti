const mongoose =require('mongoose')
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const formchema = new Schema({
      UId: {
             type: String,
             default: ''
      },
      FinalSave: {
               type: Boolean,
               default: false
      },
      ClusterInfo : {
            Name : {
                    type : String,
                    default : ''
            },
            Type : {
                   type: String,
                   default: ''
            },
            Location : {
                   type: String,
                    default: ''
            },
            Postal : {
                   type: String,
                     default: ''
            },
            State : {
                   type: String,
                     default: ''
            },
            District : {
                   type: String,
                    default: ''
            },
            Pincode : {
                   type: String,
                     default: ''
            },
            MobileNo : {
                   type: String,
                     default: ''
            },
            Email : {
                   type: String,
                   default: ''
            },
            AltEmail : {
                   type: String,
                   default: ''
            },
            TelephoneNo : {
                   type: String,
                   default: ''
            },
            FaxNo : {
                   type: String,
                   default: ''
            },
            Estd : {
                   type: String,
                   default: ''
            },
            OrgType : {
                   type: String,
                   default: ''
            },
            KeyEconomicActivity : {
                   type: String,
                     default: ''
            },
            ExpInClusterDev : {
                   type: String,
                     default: ''
            },
            NoPotentialArtisans : {
                   type: String,
                     default: ''
            }
      },
      ImplementingAgency : {
            Name : {
                   type: String,
                   default: ''
            },
            Type : {
                   type: String,
                   default: ''
            },
            Pincode : {
                   type: String,
                    default: ''
            },
            State : {
                   type: String,
                     default: ''
            },
            District : {
                   type: String,
                     default: ''
            },
            Email : {
                   type: String,
                    default: ''
            },
            ContactPersonName : {
                   type: String,
                     default: ''
            },
            MobileNo : {
                   type: String,
                     default: ''
            },
            TelephoneNo : {
                   type: String,
                   default: ''
            },
            OrgType : {
                   type: String,
                   default: ''
            },
            RegNo : {
                   type: String,
                   default: ''
            },
            ValidityDate : {
                   type: String,
                   default: ''
            },
            MemorandumOfAssociation : {
                   type: Buffer,
                     default: ''
            },
            CertificateOfReg : {
                   type: Buffer,
                     default: ''
            },
            OrgPAN : {
                   type: Buffer,
                     default: ''
            },
            AadharNo : {
                   type: Buffer,
                     default: ''
            },
            AcHolderName : {
                   type: String,
                   default: ''
            },
            BankAcNo : {
                   type: String,
                   default: ''
            },
            BankName : {
                   type: String,
                   default: ''
            },
            BranchCity : {
                   type: String,
                   default: ''
            },
            IFSC : {
                   type: String,
                   default: ''
            },
            IADetails: [
                    {Year : {
                          type: String,
                          default: ''
                     },
                     FinancialReport : {
                         type: Buffer,
                          default: ''
                     },
                     ITR : {
                         type: Buffer,
                         default: ''
                     },
                     Activity : {
                         type: String,
                         default: ''
                     }
                    }
             ]
      },
      SPVDetails : {
           Structure:{
                type: String,
                default: '' 
           },
           Compostion:{
                type: String,
                default: '' 
           },
           SPVRegCertificate:{
                type: Buffer,
                default: '' 
           },
           BoardofManagement : [{
                Compostion: {
                       type: String,
                       default: ''
                },
                RoleAndDesignation :  {
                       type: String,
                       default: ''
                },
                ContactDetails:{
                      type: String,
                      default: '' 
                }
           }]
      },
      ClusterProduct : {
           Products : [{
                  TypeOfProduct:{
                     type: String,
                     default: '' 
                  },
                  NameofProduct:{
                      type: String,
                      default: '' 
                   },
                  ImageofProduct:{
                      type: Buffer,
                      default: '' 
                   },
                   PackageCluster:{
                      type: Buffer,
                      default: '' 
                   }
            }],
            LocalProcure:{
                type: String,
                default: '' 
            },
            OutsideState:{
                type: String,
                default: '' 
            },
            Import:{
                type: String,
                default: '' 
            }       
            
      },
      LandDetails : {
            Category : {
                   type: String,
                   default: ''
            },
            NameofOwner : {
                   type: String,
                   default: ''
            },
            TotalArea : {
                   type: String,
                    default: ''
            },
            LandCost : {
                   type: String,
                     default: ''
            },
            LandAddress : {
                   type: String,
                     default: ''
            },
            LandDocument : {
                   type: Buffer,
                     default: ''
            }
      },
      SoftInterventionDetails : {
            Type : {
                   type: String,
                   default: ''
            },
            ActivityName : {
                   type: String,
                   default: ''
            },
            CourseOutline : {
                   type: String,
                    default: ''
            },
            NoOfDays : {
                   type: String,
                     default: ''
            },
            NoOfParticipant : {
                   type: String,
                     default: ''
            },
            Amount : {
                   type: String,
                     default: ''
            },
            Trainers : {
                   type: String,
                     default: ''
            },
            TrainingDeliveryMethod : {
                   type: String,
                     default: ''
            },
            RequiredInfrastructureDetails : {
                   type: String,
                     default: ''
            },
            AvailabilityOfInfrastructure : {
                   type: String,
                     default: ''
            }
            
      },
      HardInterventionDetails : {
           CommonFacilityCentre : [{
                  Name:{
                      type: String,
                      default: '' 
                   },
                  Location:{
                      type: String,
                      default: '' 
                   },
                  Amount:{
                      type: String,
                      default: '' 
                  }
           }],
           PlantandMachinery : [{
                  NameofTrade:{
                      type: String,
                      default: '' 
                   },
                  NameofMachine:{
                      type: String,
                      default: '' 
                   },
                  Specification:{
                      type: String,
                      default: '' 
                  },
                  Quantity:{
                      type: String,
                      default: '' 
                   },
                   Rate:{
                      type: String,
                      default: '' 
                   },
                   Amount:{
                      type: String,
                      default: '' 
                   }
           }],
           RawMaterialBank : [{
                  Name:{
                      type: String,
                      default: '' 
                   },
                  Location:{
                      type: String,
                      default: '' 
                   },
                  Amount:{
                      type: String,
                      default: '' 
                  }
           }]      
       },
       ProjectCostDetails : {
            State : {
                   type: String,
                   default: ''
            },
            HardInterventionCostTotal : {
                   type: String,
                   default: ''
            },
           HardInterventionCost : {
                   SfrutiAssistance:{
                           type: String,
                           default: ''
                   },
                   IAShare:{
                           type: String,
                           default: ''
                   }
           },
           SoftInterventionCostTotal : {
                   SfrutiAssistance:{
                           type: String,
                           default: ''
                   },
                   IAShare:{
                           type: String,
                           default: ''
                   }
           },
            TechnicalAgencyCost : {
                   SfrutiAssistance:{
                           type: String,
                           default: ''
                   },
                   IAShare:{
                           type: String,
                           default: ''
                   }
           },
            ImplementingAgencyCost : {
                   SfrutiAssistance:{
                           type: String,
                           default: ''
                   },
                   IAShare:{
                           type: String,
                           default: ''
                   }
           },
            SubTotalCost : {
                   SfrutiAssistance:{
                           type: String,
                           default: ''
                   },
                   IAShare:{
                           type: String,
                           default: ''
                   }
           },
            AnyOtherFunding : {
                   Name:{
                           type: String,
                           default: ''
                   },
                   Amount:{
                           type: String,
                           default: ''
                   }
           },
           TotalCost : {
                   SfrutiAssistance:{
                           type: String,
                           default: ''
                   },
                   IAShare:{
                           type: String,
                           default: ''
                   }
           }
        },         
       ProjectTimeline : {
            Activity : {
                   type: String,
                   default: ''
            },
            Q1 : {
                   type: String,
                   default: ''
            },
            Q2 : {
                   type: String,
                    default: ''
            },
            Q3 : {
                   type: String,
                     default: ''
            },
            Q4 : {
                   type: String,
                     default: ''
            },
            Q5 : {
                   type: String,
                     default: ''
            },
            Q6 : {
                   type: String,
                     default: ''
            },
            Q7 : {
                   type: String,
                     default: ''
            },
            Q8 : {
                   type: String,
                     default: ''
            },
            Q9 : {
                   type: String,
                     default: ''
            },
            Q10 : {
                   type: String,
                     default: ''
            },
            Q11 : {
                   type: String,
                     default: ''
            },
            Q12 : {
                   type: String,
                     default: ''
            }
        },
       ExpectedImpact : {
           TurnOver : {
                   Year1:{
                           type: String,
                           default: ''
                   },
                   Year2:{
                           type: String,
                           default: ''
                   },
                   Year3:{
                           type: String,
                           default: ''
                   },
                   Year4:{
                           type: String,
                           default: ''
                   },
                   Year5:{
                           type: String,
                           default: ''
                   }
           },
           Wages : {
                   Year1:{
                           type: String,
                           default: ''
                   },
                   Year2:{
                           type: String,
                           default: ''
                   },
                   Year3:{
                           type: String,
                           default: ''
                   },
                   Year4:{
                           type: String,
                           default: ''
                   },
                   Year5:{
                           type: String,
                           default: ''
                   }
           },
           Production : {
                   Year1:{
                           type: String,
                           default: ''
                   },
                   Year2:{
                           type: String,
                           default: ''
                   },
                   Year3:{
                           type: String,
                           default: ''
                   },
                   Year4:{
                           type: String,
                           default: ''
                   },
                   Year5:{
                           type: String,
                           default: ''
                   }
           },
           Sales : {
                   Year1:{
                           type: String,
                           default: ''
                   },
                   Year2:{
                           type: String,
                           default: ''
                   },
                   Year3:{
                           type: String,
                           default: ''
                   },
                   Year4:{
                           type: String,
                           default: ''
                   },
                   Year5:{
                           type: String,
                           default: ''
                   }
           },
           ArtisansNo : {
                   Year1:{
                           type: String,
                           default: ''
                   },
                   Year2:{
                           type: String,
                           default: ''
                   },
                   Year3:{
                           type: String,
                           default: ''
                   },
                   Year4:{
                           type: String,
                           default: ''
                   },
                   Year5:{
                           type: String,
                           default: ''
                   }
           }
           
        },
       TentativeBussinessPlan : {
           AnnualProduction : [{
                  ProductName:{
                      type: String,
                      default: '' 
                   },
                  Quantity:{
                      type: String,
                      default: '' 
                   },
                  Unit:{
                      type: String,
                      default: '' 
                  },
                  Rate:{
                      type: String,
                      default: '' 
                   },
                   Value:{
                      type: String,
                      default: '' 
                   }
           }],
           SalesTurnover : [{
                  ProductName:{
                      type: String,
                      default: '' 
                   },
                  Quantity:{
                      type: String,
                      default: '' 
                   },
                  Unit:{
                      type: String,
                      default: '' 
                  },
                  Rate:{
                      type: String,
                      default: '' 
                   },
                   Value:{
                      type: String,
                      default: '' 
                   }
           }],
           AnyBuyBackAgreement:{
                 type: String,
                 default: '' 
           },
           AnyTieUpWithOutlet:{
                      type: String,
                      default: '' 
           },
           OtherModeofMarketing:{
                      type: String,
                      default: '' 
           },
           AnyOtherInfo:{
                      type: String,
                      default: '' 
          }
        },
        ArtisanDetails : [{
            Name : {
                   type: String,
                   default: ''
            },
            FatherorHusbandName : {
                   type: String,
                   default: ''
            },
            Gender : {
                   type: String,
                    default: ''
            },
            Age : {
                   type: String,
                     default: ''
            },
            Category : {
                   type: String,
                     default: ''
            },
            AadharorEpic : {
                   type: String,
                    default: ''
            },
            MobileNo : {
                   type: String,
                     default: ''
            },
            BankACNo: {
                   type: String,
                     default: ''
            }
            
      }]
   })

const Form = new mongoose.model("forms",formchema);

module.exports = Form;